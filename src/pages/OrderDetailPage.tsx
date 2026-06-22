import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder, verifyOrder } from '../api/orders'
import { ErrorAlert, SuccessAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { StatusBadge } from '../components/StatusBadge'
import type { OrderDetail } from '../types'
import { formatDate, formatNumber } from '../utils/panels'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const orderId = Number(id)
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    if (!orderId) return
    getOrder(orderId)
      .then(setOrder)
      .catch(() => setError('Failed to load order details.'))
      .finally(() => setLoading(false))
  }, [orderId])

  async function handleVerify() {
    if (!orderId) return
    setVerifying(true)
    setError(null)
    setSuccess(null)
    try {
      const message = await verifyOrder(orderId)
      setSuccess(message)
      const updated = await getOrder(orderId)
      setOrder(updated)
    } catch {
      setError('Failed to verify order.')
    } finally {
      setVerifying(false)
    }
  }

  if (loading) return <Loading message="Loading order..." />
  if (error && !order) return <ErrorAlert message={error} />
  if (!order) return <ErrorAlert message="Order not found." />

  const crm = order.ideal_crm

  return (
    <div className="page">
      <div className="content-header">
        <div>
          <Link to="/orders" className="back-link">
            ← Back to Orders
          </Link>
          <h1>Order #{order.id}</h1>
        </div>
        {order.status === 'retrieved' && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? 'Verifying...' : 'Verify Order'}
          </button>
        )}
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

      <div className="card">
        <div className="card-header">Overview</div>
        <div className="card-body">
          <div className="detail-grid">
            <DetailItem label="Status" value={<StatusBadge status={order.status} />} />
            <DetailItem label="Register Date" value={formatDate(order.register_date)} />
            <DetailItem label="Order Number" value={crm.ApiOrdNumber} />
            <DetailItem label="Operation" value={crm.ApiOrderOpr} />
            <DetailItem label="Company" value={crm.ApiOrdCompany} />
            <DetailItem label="Contact Person" value={crm.ApiOrdCompanyPerson} />
            <DetailItem label="Project" value={crm.ApiOrdProject} />
            <DetailItem label="Center" value={crm.ApiOrdCenterName} />
            <DetailItem label="Refer User" value={crm.ApiOrdReferUser} />
            <DetailItem label="Guaranty" value={crm.ApiOrdGuaranty} />
            <DetailItem label="Print Format" value={crm.ApiOrdPrintFormat} />
            <DetailItem label="Item Count" value={crm.ApiOrdItemCount} />
            <DetailItem label="Items Amount" value={formatNumber(crm.ApiOrdItemsAmount)} />
            <DetailItem label="Discount" value={formatNumber(crm.ApiOrdDiscount)} />
            <DetailItem label="Tax" value={formatNumber(crm.ApiOrdTax)} />
            <DetailItem label="Total Amount" value={formatNumber(crm.ApiOrdTotalAmount)} />
            <DetailItem label="Total (Words)" value={crm.ApiOrdTotalAmountStr} />
            <DetailItem label="Verified" value={crm.ApiOrdIsVerified ? 'Yes' : 'No'} />
            <DetailItem label="Payment Status" value={crm.ApiOrdStatus} />
          </div>
        </div>
      </div>

      {(crm.ApiOrdDescriptionI || crm.ApiOrdDescriptionII || crm.ApiOrdNote) && (
        <div className="card">
          <div className="card-header">Notes & Descriptions</div>
          <div className="card-body detail-stack">
            {crm.ApiOrdNote && (
              <div>
                <strong>Note:</strong> {crm.ApiOrdNote}
              </div>
            )}
            {crm.ApiOrdDescriptionI && (
              <div>
                <strong>Description I:</strong> {crm.ApiOrdDescriptionI}
              </div>
            )}
            {crm.ApiOrdDescriptionII && (
              <div>
                <strong>Description II:</strong> {crm.ApiOrdDescriptionII}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function DetailItem({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}
