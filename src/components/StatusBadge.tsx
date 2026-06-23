import type { OrderStatus } from '../types'
import { useI18n } from '../context/I18nContext'

const STATUS_VARIANTS: Record<OrderStatus, string> = {
  retrieved: 'warning',
  verified: 'success',
  document_issued: 'default',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useI18n()
  // Translation keys can be created dynamically or statically. 
  // We'll fall back to capitalized string if no translation exists.
  return <span className={`badge badge-${STATUS_VARIANTS[status]}`}>{t(`status.${status}`) !== `status.${status}` ? t(`status.${status}`) : status}</span>
}
