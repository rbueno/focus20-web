'use client'
import axios from 'axios'

const baseURL = process.env.API_BASE_URL

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(async(config) => {
    const accessToken = localStorage.getItem('accessToken')
    const workspaceId = localStorage.getItem('workspaceId')

    if (accessToken && workspaceId) {
        config.headers.Authorization = `Bearer ${accessToken}`
        config.headers['x-workspaceid'] = workspaceId
    }
    return config
})

export { apiClient }