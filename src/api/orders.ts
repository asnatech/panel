import { api } from './client'
import type { ApiResponse, OrderDetail, OrderListItem, DocumentListItem } from '../types'

export async function getOrders(): Promise<OrderListItem[]> {
  const { data } = await api.get<ApiResponse<OrderListItem[]>>('/orders')
  return data.data
}

export async function getOrder(id: number): Promise<OrderDetail> {
  const { data } = await api.get<ApiResponse<OrderDetail>>(`/orders/${id}`)
  return data.data
}

export async function verifyOrder(id: number): Promise<string> {
  const { data } = await api.post<ApiResponse<null>>(`/orders/${id}/verify`, {})
  return data.message
}

export async function getOrderDocuments(id: number): Promise<DocumentListItem[]> {
  const { data } = await api.get<ApiResponse<DocumentListItem[]>>(`/orders/${id}/documents`)
  return data.data
}
