'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Dva0Uv0sKfW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Label } from "@/components/label"
import { Input } from "@/components/input"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { apiClient } from "@/lib/http/apiClient"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/card"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { AuthHeader } from "@/components/auth"
import {Chrome, Facebook} from 'lucide-react'

export default function AuthLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleCredentialLogin = async () => {
    setIsLoading(true)
    try {
      const { data } = await apiClient.post('/v1/user', {
        email,
        password,
        firstName: 'unknow',
        lastName: 'unknow',
        // phoneNumber,
        // phoneNumberFromQuery,
        // guestUser: false
      });
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
          <AuthHeader />
<Card>
      <CardContent className="mt-6">
      
      


        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register free trial</h1>
            <p className="text-muted-foreground">Create a new trial account</p>


          </div>

          <div className="space-y-4">
          <Button onClick={() => signIn('google')} icon={<Chrome />} variant="outline" className="w-full bg-[#DB4437] text-white hover:bg-[#c53b2e]">
              Create with Gmail
            </Button>
            {/* <Button icon={<Facebook className="mr-2 h-5 w-5" />} variant="outline" className="w-full bg-[#1877F2] text-white hover:bg-[#1366d6]">
              Sign in with Facebook
            </Button> */}
          </div>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

          {/* <div className="space-y-4">
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
          </div> */}


          <div className="space-y-4">
         
                <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                  <Link href="/auth/login" className="font-medium underline underline-offset-4" prefetch={false}>
                    Login
                  </Link>
                </div>
          </div>

      </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
