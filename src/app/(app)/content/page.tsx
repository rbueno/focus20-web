'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default async function InsightHome() {
const router = useRouter()

  useEffect(() => {
    router.push('/')
  })
  
  return (
    <>
      redirecting...
    </>
  )
}
