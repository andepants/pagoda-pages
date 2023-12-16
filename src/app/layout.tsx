import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pagoda Pages',
  description: 'Free eBooks for fun!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script data-name="BMC-Widget" data-cfasync="false" defer src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="andepants" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF813F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
