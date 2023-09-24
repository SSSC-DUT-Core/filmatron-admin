'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';

import DiscordLoginImage from '../../../public/assets/auth/login-discord.svg';
import FacebookLoginImage from '../../../public/assets/auth/login-facebook.svg';
import GoogleLoginImage from '../../../public/assets/auth/login-google.svg';
import TwitterLoginImage from '../../../public/assets/auth/login-twitter.svg';
import logo from '../../../public/assets/logo.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import RPC from '../../../providers/solanaRPC';

const clientId =
	'BOAVY7JsleeYdhThRhwt2w7iBgqrNzroFXSIVrKOtF8lyrzdgss-wuGgUPMcmQPuJ5M4ECgWaS4KHBR5d2xzTSU';

const formSchema = z.object({
	email: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>;

const socialLoginOptions = [
	{
		loginType: 'google',
		imageHeight: '30px',
		imageClass: 'w-6 mr-2 login-button-images',
		divClass: 'col-span-3',
		imageSrc: GoogleLoginImage,
		imgAltText: 'Login with Google',
		buttonLoginText: true,
		translateLoginText: 'dappLogin.continue',
		verifier: 'Google',
	},
	{
		imageClass: 'w-6 login-button-images',
		loginType: 'facebook',
		imageSrc: FacebookLoginImage,
		imgAltText: 'Login with Facebook',
	},
	{
		loginType: 'twitter',
		imageClass: 'w-6 login-button-images',
		imageSrc: TwitterLoginImage,
		imgAltText: 'Login with Twitter',
	},
	{
		imageClass: 'w-6 login-button-images',
		loginType: 'discord',
		imageSrc: DiscordLoginImage,
		imgAltText: 'Login with Discord',
	},
];

const SetupPage = () => {
	const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
	const [provider, setProvider] = useState<IProvider | null>(null);
	const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		const init = async () => {
			try {
				const chainConfig = {
					chainNamespace: CHAIN_NAMESPACES.SOLANA,
					chainId: '0x3', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
					rpcTarget: 'https://api.devnet.solana.com',
					displayName: 'Solana Devnet',
					blockExplorer: 'https://explorer.solana.com',
					ticker: 'SOL',
					tickerName: 'Solana Token',
				};
				const web3auth = new Web3AuthNoModal({
					clientId,
					chainConfig,
					web3AuthNetwork: 'cyan',
				});

				setWeb3auth(web3auth);

				const privateKeyProvider = new SolanaPrivateKeyProvider({
					config: { chainConfig },
				});

				const openloginAdapter = new OpenloginAdapter({
					privateKeyProvider,
				});
				web3auth.configureAdapter(openloginAdapter);

				await web3auth.init();
				setProvider(web3auth.provider);
				if (web3auth.connected) {
					setLoggedIn(true);
				}
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, []);

	const login = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		try {
      const web3authProvider = await web3auth.connectTo(
				WALLET_ADAPTERS.OPENLOGIN,
				{
					loginProvider: 'google',
				}
			);
			setProvider(web3authProvider);
      router.push('/dashboard', { scroll: false });
    } catch (error) {
      console.error(error)
    }
	};

	const authenticateUser = async () => {
		if (!web3auth) {
			console.log('web3auth not initialized yet');
			return;
		}
		const idToken = await web3auth.authenticateUser();
		console.log('idToken: ', idToken);
	};

	const getUserInfo = async () => {
		if (!web3auth) {
			console.log('web3auth not initialized yet');
			return;
		}
		const user = await web3auth.getUserInfo();
    console.log('user: ', user);
	};

	const logout = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		await web3auth.logout();
		setProvider(null);
		setLoggedIn(false);
	};

	const getAccounts = async () => {
		if (!provider) {
			console.log('provider not initialized yet');
			return;
		}
		const rpc = new RPC(provider);
		const address = await rpc.getAccounts();
    console.log('address: ', address);
	};

	const getBalance = async () => {
		if (!provider) {
			console.log('provider not initialized yet');
			return;
		}
		const rpc = new RPC(provider);
		const balance = await rpc.getBalance();
    console.log('balance: ', balance);
	};

	const sendTransaction = async () => {
		if (!provider) {
			console.log('provider not initialized yet');
			return;
		}
		const rpc = new RPC(provider);
		const receipt = await rpc.sendTransaction();
    console.log('receipt: ', receipt);
	};

	const signMessage = async () => {
		if (!provider) {
			console.log('provider not initialized yet');
			return;
		}
		const rpc = new RPC(provider);
		const signedMessage = await rpc.signMessage();
    console.log('signedMessage: ', signedMessage);
	};

	const getPrivateKey = async () => {
		if (!provider) {
			console.log('provider not initialized yet');
			return;
		}
		const rpc = new RPC(provider);
		const privateKey = await rpc.getPrivateKey();
    console.log('privateKey: ', privateKey);
	};

	function uiConsole(...args: any[]): void {
		const el = document.querySelector('#console>p');
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2);
		}
	}

	const loggedInView = (
		<>
			<div className="flex-container">
				<div>
					<button onClick={getUserInfo} className="card">
						Get User Info
					</button>
				</div>
				<div>
					<button onClick={authenticateUser} className="card">
						Get ID Token
					</button>
				</div>
				<div>
					<button onClick={getAccounts} className="card">
						Get Accounts
					</button>
				</div>
				<div>
					<button onClick={getBalance} className="card">
						Get Balance
					</button>
				</div>
				<div>
					<button onClick={signMessage} className="card">
						Sign Message
					</button>
				</div>
				<div>
					<button onClick={sendTransaction} className="card">
						Send Transaction
					</button>
				</div>
				<div>
					<button onClick={getPrivateKey} className="card">
						Get Private Key
					</button>
				</div>
				<div>
					<button onClick={logout} className="card">
						Log Out
					</button>
				</div>
			</div>
			<div id="console" style={{ whiteSpace: 'pre-line' }}>
				<p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
			</div>
		</>
	);

	const unloggedInView = (
		<button onClick={login} className="card">
			Login
		</button>
	);

	const onEmailLogin = (value: LoginFormValues) => {
		// onLogin(LOGIN_PROVIDER.EMAIL_PASSWORDLESS, value.email);
	};

	return (
		<div className="bg-background-layout bg-cover bg-right w-screen h-screen py-20 px-32">
			<div className="bg-background bg-cover bg-center">
				<div className="h-[80vh] grid grid-cols-6">
					<div className="grid grid-cols-12 col-span-3 h-screen md:h-auto">
						<div className="col-end-9 col-span-9 bg-transparent h-full w-full">
							<div className="flex justify-center bg-[#00000099] flex-col items-center h-full text-white px-10">
								<Image src={logo} width={100} height={100} alt="logo-orus" />
								<p>Login with</p>
								<div className="space-y-3 w-full">
									{socialLoginOptions.map((socialLoginOption) => {
										return (
											<div
												key={socialLoginOption.loginType}
												className="bg-[#00000099] grayscale hover:grayscale-0 pl-8 cursor-pointer flex-row space-x-3 w-full text-start h-12 flex items-center rounded-2xl group relative overflow-hidden shadow"
												onClick={login}
											>
												<div className="absolute z-0 inset-0 w-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 transition-all duration-500 ease-out group-hover:w-full"></div>
												<Image
													src={socialLoginOption.imageSrc}
													width={20}
													height={20}
													alt={socialLoginOption.imgAltText}
													className="z-10"
												/>
												<p className="m-0 z-10 font-normal text-sm">
													{socialLoginOption.imgAltText}
												</p>
											</div>
										);
									})}
								</div>
								<div className="mt-3 relative w-full">
									<div
										className="absolute inset-0 flex items-center"
										aria-hidden="true"
									>
										<div className="w-full border-t border-app-text-100"></div>
									</div>
								</div>

								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onEmailLogin)}
										className="space-y-8 w-full"
									>
										<div className="md:grid md:grid-cols-3 gap-8">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Label</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter your Email"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<Button
											disabled={loading}
											className="ml-auto"
											type="submit"
										>
											Continue with Email
										</Button>
									</form>
								</Form>
							</div>
						</div>
					</div>
					<div className="h-full flex items-center">
						<div className="grid text-white">
							{loggedIn ? loggedInView : unloggedInView}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SetupPage;
