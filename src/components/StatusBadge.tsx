import type { OrderStatus } from '../types'

const STATUS_LABELS: Record<OrderStatus, string> = {
  retrieved: 'Retrieved',
  verified: 'Verified',
  document_issued: 'Document Issued',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABELS[status]}</span>
}
