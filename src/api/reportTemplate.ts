import { api } from './client'
import type { ApiResponse } from '../types'

export async function getReportTemplate(): Promise<string | null> {
  const { data } = await api.get<ApiResponse<string>>('/report_template')
  return data.data ?? null
}

export async function saveReportTemplate(content: string): Promise<string> {
  const { data } = await api.post<ApiResponse<null>>('/report_template', content, {
    headers: { 'Content-Type': 'text/plain' },
  })
  return data.message
}

export async function deleteReportTemplate(): Promise<string> {
  const { data } = await api.delete<ApiResponse<null>>('/report_template')
  return data.message
}
