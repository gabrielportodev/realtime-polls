import { Header } from '@/components/poll/header'
import { Open_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans'
})

export const metadata: Metadata = {
  title: 'Realtime Polls',
  description: 'Realtime Polls'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' className={`${openSans.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Header />
        {children}
      </body>
    </html>
  )
}
