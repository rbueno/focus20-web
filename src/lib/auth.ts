import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import { JWT } from 'next-auth/jwt'
import GoogleProvider from "next-auth/providers/google";
import { apiClient } from "./http/apiClient";
import { Adapter } from "next-auth/adapters";
import { encrypt } from "./crypto";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''

interface IUser extends DefaultUser {
  accessToken: string
  info: any
}

interface ISession extends DefaultSession{
  accessToken: string
}

declare module 'next-auth' {
  interface Session extends ISession {}
  interface User extends IUser {
    workspaceId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    userInfo: any
  }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET
        })
      ],
    callbacks: {
        async signIn(signInParams) {
          const { user, account } = signInParams

          if (account?.provider !== 'google' || !user?.email) {
            return false
          }
          
          const authPayload = {
            provider: account?.provider,
            providerId: account?.providerAccountId,
            name: user?.name,
            email: user?.email,
            avatar: user?.image
          }

          // const encriptedPayload = encrypt(authPayload)
          
          try {
            const response = await fetch(`${process.env.API_BASE_URL}/auth/provider`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(authPayload)
            })

            if (!response?.ok) throw new Error(response?.statusText || 'Unknow error')
            
            const authResponse = await response.json()

            const { accessToken, workspaceSession } = authResponse;
            const workspaceId = workspaceSession?.currentWorkspace?._id
            const userInfo = workspaceSession?.user
        
            user.accessToken = accessToken
            user.info = { workspaceId: workspaceId, ...userInfo }
            return true
          } catch (error) {
            console.dir(error, { depth: null })

            return false
          }
        },
        async jwt(jwtParams) {
          const { token, user } = jwtParams
          
          if (user) {
            token.accessToken = user?.accessToken
            token.userInfo = user?.info
          }
          return token
        },
        async session(sessionParams) {
          const { session, token } = sessionParams
          session.accessToken = token.accessToken
          session.user = { ...session.user, ...token.userInfo }
          return sessionParams.session
        },
    },
    pages: {
      signIn: '/auth/login'
    },
    events: {
      async signOut() {
        console.log('logged out')
      }
      },
    secret: process.env.AUTH_SECRET
}