'use client'
import axios from 'axios'
import { DefaultSession, DefaultUser, Session } from 'next-auth'
import { getSession } from 'next-auth/react'

interface IUser extends DefaultUser {
    workspaceId: string
}

interface ISession extends DefaultSession {
    user: IUser
}
declare module 'next-auth/react' {
    interface Session extends ISession {}
}

const baseURL = process.env.API_BASE_URL

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(async(config) => {
    const session = await getSession() as any
    console.log('session hook', session)
    console.log('workspace id', session?.user?.workspaceId)

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`
        config.headers['x-workspaceid'] = session?.user?.workspaceId
    }
    return config
})

export { apiClient }