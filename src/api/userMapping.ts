import { api } from './client'
import type { ApiResponse, MappingMatrix, UserMappingData } from '../types'

export async function getUserMapping(): Promise<UserMappingData> {
  const { data } = await api.get<ApiResponse<UserMappingData>>('/user_mapping')
  return data.data
}

export async function updateUserMapping(changes: MappingMatrix): Promise<string> {
  const { data } = await api.put<ApiResponse<null>>('/user_mapping', changes)
  return data.message
}
