import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Commodity Price Analysis',
  description: 'A simple price tracker',
}

export default function RootLayout({ children }) {
  return (
    <html id="__next" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
