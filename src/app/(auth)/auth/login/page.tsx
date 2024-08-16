'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/label"
import { Input } from "@/components/input"
import Link from "next/link"
import { apiClient } from "@/lib/http/apiClient"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/card"
import { toast } from "sonner"
import { AxiosError } from "axios"

export default function AuthLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleCredentialLogin = async () => {
    setIsLoading(true)
    try {
      const { data } = await apiClient.post('/v1/session', {
        email,
        password,
      })
      console.log('logged data', data)
        const { accessToken, workspaceSession } = data;
        const workspaceId = workspaceSession?.currentWorkspace?._id
        const userEmail = workspaceSession?.user?.email
    
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userEmail', userEmail);
        workspaceId && localStorage.setItem('workspaceId', workspaceId);
    
        setIsLoading(false)
        router.push('/')

    } catch (error) {
      error instanceof AxiosError ? toast(error?.response?.data?.message) : toast('Unknow error')
      console.log(error)
    }

    setIsLoading(false)
    
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center text-center mt-6">
          <img src="/assets/logo.png" className="w-[80%] mb-4" alt="focus20 logo" />
          {/* <p>Descubra os 20% dos seus posts que geram 80% do seu engajamento no Instagram.</p> */}
          <p className="mx-auto max-w-4xl font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-3xl">
          Discover the {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative">20%</span>
        </span>{' '}
        of your posts that drive {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative">80%</span>
        </span>{' '}
        of your {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">Instagram engagement</span>
        </span>{' '}
        
      </p>
          {/* <p>Uncover the 20% of your posts that drive 80% of your Instagram engagement.</p> */}

            </div>
          </div>
<Card>
      <CardContent className="mt-6">
      
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="text-muted-foreground">Enter your email and password below to access your account.</p>
        </div>
        <div className="space-y-4">
          {/* <Button onClick={() => signIn('google')} variant="outline" className="w-full">
            <ChromeIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full">
            <FacebookIcon className="mr-2 h-5 w-5" />
            Sign in with Facebook
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}
          <form className="space-y-4">
            <div className="space-y-1 mt-6">
              <Label htmlFor="email">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
            <Button isLoading={isLoading} type="button" className="w-full" onClick={() => handleCredentialLogin()}>
              Sign in
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link href="/auth/signup" className="font-medium underline underline-offset-4" prefetch={false}>
              Register
            </Link>
          </div>
        </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
