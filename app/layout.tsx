import './globals.css'
import "@radix-ui/themes/styles.css";
import { Container, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import AuthProvider from './auth/Provider'
import ClientProvider from './ClientProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: "swap",
  variable: "--font-inter", 
})

export const metadata: Metadata = {
  title: 'Ticket Manager',
  description: 'Add Update and Assign Tickets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ClientProvider>
          <AuthProvider>
            <Theme>        
              <NavBar/>
              <main className='pt-5'>
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
