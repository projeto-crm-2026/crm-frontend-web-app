import { api } from '../../../instances/axios'
import type { LoginRequest, LoginResponse } from '../types/auth'
import { loginResponseSchema } from '../types/auth'

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post('/login', data)
  return loginResponseSchema.parse(res.data)
}

export async function logout(): Promise<void> {
  await api.post('/logout')
}