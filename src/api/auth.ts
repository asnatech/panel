import type { ApiResponse, LoginRequest, LoginResponse } from '../types'
import { api } from './client'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
  return data.data
}

export async function getPanels(): Promise<string[]> {
  const { data } = await api.get<ApiResponse<string[]>>('/appconfig/panels')
  return data.data
}
