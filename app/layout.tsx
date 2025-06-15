import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'

export const metadata: Metadata = {
  title: 'ResuScan - AI-Powered Resume Scanning',
  description: 'Automatically analyze resumes, filter qualified candidates, and schedule interviews. Save 200+ hours per month with intelligent recruitment automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
