import './globals.css'
import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-background text-text'>
        <Navbar />
        <main id='page-root'>{children}</main>
      </body>
    </html>
  )
}
