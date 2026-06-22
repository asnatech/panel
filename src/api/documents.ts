import { api } from './client'
import type { ApiResponse, DocumentDetail, DocumentListItem } from '../types'

export async function getDocuments(): Promise<DocumentListItem[]> {
  const { data } = await api.get<ApiResponse<DocumentListItem[]>>('/documents')
  return data.data
}

export async function getDocument(id: number): Promise<DocumentDetail> {
  const { data } = await api.get<ApiResponse<DocumentDetail>>(`/documents/${id}`)
  return data.data
}

export async function getDocumentPdf(id: number): Promise<Blob> {
  const { data } = await api.get<Blob>(`/documents/${id}/pdf`, {
    responseType: 'blob',
  })
  return data
}
