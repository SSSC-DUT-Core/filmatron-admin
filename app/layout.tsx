
import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'
import { QueryClientProvider, Hydrate, QueryClient } from 'react-query';
import { ApolloWrapper } from '@/src/apollo-wrapper'
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'Filmatron Dashboard',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <html lang="en">  
        <body >
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            <ApolloWrapper>{children}</ApolloWrapper>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
