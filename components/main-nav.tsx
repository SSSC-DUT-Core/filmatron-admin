"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
		{
			href: `/${params.storeId}`,
			label: 'Overview',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/users`,
			label: 'Users',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/credit`,
			label: 'Credit',
			active: pathname === `/${params.storeId}/sizes`,
		},
		{
			href: `/${params.storeId}/lucky-draw`,
			label: 'Lucky draw',
			active: pathname === `/${params.storeId}/colors`,
		},
		{
			href: `/${params.storeId}/films`,
			label: 'Films',
			active: pathname === `/${params.storeId}/films`,
		},
		{
			href: `/${params.storeId}/drops`,
			label: 'Drops',
			active: pathname === `/${params.storeId}/orders`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`,
		},
	];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
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
