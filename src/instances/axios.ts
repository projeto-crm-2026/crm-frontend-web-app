import axios from 'axios'
import { API_BASE_URL } from '../config/constants'

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = globalThis.location.pathname
            if (currentPath !== '/login' && currentPath !== '/login/') {
                globalThis.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)