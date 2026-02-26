import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login } from '../services/auth-service'
import { loginRequestSchema } from '../types/auth'
import { authKeys } from '../types/query-keys'
import type { LoginRequest } from '../types/auth'

export function useAuth() {
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationKey: authKeys.login(),
        mutationFn: (data: LoginRequest) => {
            const validated = loginRequestSchema.parse(data)
            return login(validated)
        },
        onSuccess: () => {
            navigate({ to: '/crm/deals' })
        },
    })

    const handleLogin = useCallback(
        (data: LoginRequest) => {
            loginMutation.mutate(data)
        },
        [loginMutation]
    )

    const clearError = useCallback(() => {
        loginMutation.reset()
    }, [loginMutation])

    const error = loginMutation.error
        ? loginMutation.error instanceof Error
            ? loginMutation.error.message
            : 'Erro ao fazer login'
        : null

    return {
        isLoading: loginMutation.isPending,
        error,
        handleLogin,
        clearError,
    }
}