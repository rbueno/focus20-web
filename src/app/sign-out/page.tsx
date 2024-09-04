'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const SignOutPage = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    async function handleLogout() {
      if (status === 'unauthenticated') {
        router.push('/')
        return
      }
      if (status === 'authenticated' || status === 'loading') {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await signOut({ redirect: false })
      }
    }
    handleLogout()
  }, [router, status])

  return (
    <>
    ...sign out
    </>
  )
}

export default SignOutPage
