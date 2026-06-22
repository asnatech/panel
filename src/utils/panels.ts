import type { PanelId } from '../types'

export const PANEL_CONFIG: Record<
  PanelId,
  { label: string; path: string; icon: string }
> = {
  orders: { label: 'Orders', path: '/orders', icon: '📋' },
  user_mapping: { label: 'User Mapping', path: '/user-mapping', icon: '🔗' },
  report_template: { label: 'Report Template', path: '/report-template', icon: '📄' },
  documents: { label: 'Documents', path: '/documents', icon: '📁' },
}

export function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return value
  }
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}
