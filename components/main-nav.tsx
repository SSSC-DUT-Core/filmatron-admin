"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Image from "next/image";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
		{
			href: `/users`,
			label: 'Users',
			active: pathname === `/users`,
		},
		{
			href: `/credit`,
			label: 'Credit',
			active: pathname === `/credit`,
		},
		{
			href: `/lucky-draw`,
			label: 'Lucky draw',
			active: pathname === `/lucky-draw`,
		},
		{
			href: `/films`,
			label: 'Films',
			active: pathname === `/films`,
		},
		{
			href: `/drops`,
			label: 'Drops',
			active: pathname === `/drops`,
		},
		{
			href: `/settings`,
			label: 'Settings',
			active: pathname === `/settings`,
		},
	];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
			     <Link href="/">
            <div className="mr-5">
                <Image
                    src="/assets/images/logo-header.png"
                    width={144}
                    height={28}
                    alt="Logo"
                    className="h-8"
                />
            </div>
            </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
