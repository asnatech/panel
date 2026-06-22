import { api } from './client'
import type { ApiResponse, LoginRequest, LoginResponse } from '../types'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials)
  return data
}

export async function getPanels(): Promise<string[]> {
  const { data } = await api.get<ApiResponse<string[]>>('/appconfig/panels')
  return data.data
}
