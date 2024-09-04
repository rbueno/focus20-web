'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const SignOutPage = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    async function handleLogout() {
      console.log('session signout', session)
      if (session?.status === 'unauthenticated') {
        router.push('/')
        return
      }
      if (session?.status === 'authenticated' || session?.status === 'loading') {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await signOut({ redirect: false })
      }
    }
    handleLogout()
  }, [router, session])

  return (
    <>
    ...sign out
    </>
  )
}

export default SignOutPage
