import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../api/orders'
import { ErrorAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { StatusBadge } from '../components/StatusBadge'
import type { OrderListItem } from '../types'
import { formatDate } from '../utils/panels'

export function OrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading message="Loading orders..." />
  if (error) return <ErrorAlert message={error} />

  return (
    <div className="page">
      <div className="content-header">
        <h1>Orders</h1>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Register Date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-muted">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatDate(order.register_date)}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
