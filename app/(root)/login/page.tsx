"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginImage from "/public/assets/auth/login-google.svg";
import logo from "/public/assets/logo.svg";
import { config } from '@/src/config';

const socialLoginOptions = [
    {
        loginType: "google",
        imageHeight: "30px",
        imageClass: "w-6 mr-2 login-button-images",
        divClass: "col-span-3",
        imageSrc: GoogleLoginImage,
        imgAltText: "Login",
        buttonLoginText: true,
        translateLoginText: "dappLogin.continue",
        verifier: "Google",
        loginUrl:
            `https://filmatron-jwks.kylan.so/wallet/request?callbackUrl=${config.domain}/login/&permissions=Permission%3AReadPersionalInfo,Permission%3AReadWalletAddresses,Permission%3ARequestSignature`,
    },
];

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const authorizationCode = searchParams.get("authorization-code");

    useEffect(() => {
        if (authorizationCode) {
            const url = "https://filmatron-jwks.kylan.so/api/access-token";
            const body = JSON.stringify({ code: authorizationCode });

            fetch(url, {
                method: "POST",
                body,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('access_token', `Bearer ${data}`);
                    router.push("/");
                })
                .catch(error => {
                    console.error("Fetch error:", error);
                });
        }
    }, [authorizationCode]);

    return (
        <div className="bg-background-login-layout bg-cover bg-right w-screen h-screen py-20 px-32">
            <div className="bg-background-login bg-cover bg-center">
                <div className="h-[80vh] grid grid-cols-6">
                    <div className="grid grid-cols-12 col-span-3 h-screen md:h-auto">
                        <div className="col-end-9 col-span-9 bg-transparent h-full w-full">
                            <div className="flex justify-center bg-[#00000099] flex-col items-center h-full text-white px-10">
                                <Image
                                    src={logo}
                                    width={100}
                                    height={100}
                                    alt="logo-orus"
                                />
                                <p className="my-4 text-lg">Login with</p>
                                <div className="space-y-3 w-full">
                                    {socialLoginOptions.map(
                                        socialLoginOption => {
                                            return (
                                                <Link
                                                    key={
                                                        socialLoginOption.loginType
                                                    }
                                                    className="bg-[#00000099] grayscale hover:grayscale-0 pl-8 cursor-pointer flex-row space-x-3 w-full text-start h-12 flex items-center rounded-2xl group relative overflow-hidden shadow"
                                                    href={
                                                        socialLoginOption.loginUrl
                                                    }
                                                    target="_blank"
                                                >
                                                    <div className="absolute z-0 inset-0 w-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 transition-all duration-500 ease-out group-hover:w-full" />
                                                    <Image
                                                        src={
                                                            socialLoginOption.imageSrc
                                                        }
                                                        width={20}
                                                        height={20}
                                                        alt={
                                                            socialLoginOption.imgAltText
                                                        }
                                                        className="z-10"
                                                    />
                                                    <p className="m-0 z-10 font-normal text-sm">
                                                        {
                                                            socialLoginOption.imgAltText
                                                        }
                                                    </p>
                                                </Link>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
