import { getEvents } from '@/data'
import '@/styles/tailwind.css'
// import type { Metadata } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  console.log('RootLayout session', session)
  if (!session) redirect('/auth/signup')
  // if (typeof window !== 'undefined') {
  //   const token = localStorage.getItem('accessToken')
  //   if (!token) router.push('/auth/signup')
  // }
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ApplicationLayout events={[]} user={session?.user} >{children}</ApplicationLayout>
        <Toaster />
      </body>
    </html>
  )
}
