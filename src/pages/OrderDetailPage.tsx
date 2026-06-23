import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getOrder, verifyOrder, getOrderDocuments } from '../api/orders'
import { ErrorAlert, SuccessAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { StatusBadge } from '../components/StatusBadge'
import type { OrderDetail, DocumentListItem } from '../types'
import { formatDate, formatNumber } from '../utils/panels'
import { useI18n } from '../context/I18nContext'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const orderId = Number(id)
  const navigate = useNavigate()
  const { t } = useI18n()
  
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [documents, setDocuments] = useState<DocumentListItem[]>([])
  
  const [loading, setLoading] = useState(true)
  const [docsLoading, setDocsLoading] = useState(true)
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    if (!orderId) return
    getOrder(orderId)
      .then(setOrder)
      .catch(() => setError('Failed to load order details.'))
      .finally(() => setLoading(false))

    getOrderDocuments(orderId)
      .then(setDocuments)
      .catch(() => console.error('Failed to load documents'))
      .finally(() => setDocsLoading(false))
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

  if (loading) return <Loading message={t('common.loading')} />
  if (error && !order) return <ErrorAlert message={error} />
  if (!order) return <ErrorAlert message="Order not found." />

  const crm = order.ideal_crm

  return (
    <div className="page">
      <div className="content-header">
        <div>
          <Link to="/orders" className="back-link">
            ← {t('common.back')}
          </Link>
          <h1>{t('nav.orders')} #{order.id}</h1>
        </div>
        {order.status === 'retrieved' && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? t('common.loading') : t('order.verify')}
          </button>
        )}
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

      <div className="card">
        <div className="card-header">{t('order.overview')}</div>
        <div className="card-body">
          <div className="detail-grid">
            <DetailItem label={t('common.status')} value={<StatusBadge status={order.status} />} />
            <DetailItem label={t('order.registerDate')} value={formatDate(order.register_date)} />
            <DetailItem label={t('order.orderNumber')} value={crm.ApiOrdNumber} />
            <DetailItem label={t('order.operation')} value={crm.ApiOrderOpr} />
            <DetailItem label={t('order.company')} value={crm.ApiOrdCompany} />
            <DetailItem label={t('order.contactPerson')} value={crm.ApiOrdCompanyPerson} />
            <DetailItem label={t('order.project')} value={crm.ApiOrdProject} />
            <DetailItem label={t('order.center')} value={crm.ApiOrdCenterName} />
            <DetailItem label={t('order.referUser')} value={crm.ApiOrdReferUser} />
            <DetailItem label={t('order.guaranty')} value={crm.ApiOrdGuaranty} />
            <DetailItem label={t('order.printFormat')} value={crm.ApiOrdPrintFormat} />
            <DetailItem label={t('order.itemCount')} value={crm.ApiOrdItemCount} />
            <DetailItem label={t('order.itemsAmount')} value={formatNumber(crm.ApiOrdItemsAmount)} />
            <DetailItem label={t('order.discount')} value={formatNumber(crm.ApiOrdDiscount)} />
            <DetailItem label={t('order.tax')} value={formatNumber(crm.ApiOrdTax)} />
            <DetailItem label={t('order.totalAmount')} value={formatNumber(crm.ApiOrdTotalAmount)} />
            <DetailItem label={t('order.totalWords')} value={crm.ApiOrdTotalAmountStr} />
            <DetailItem label={t('order.verified')} value={crm.ApiOrdIsVerified ? t('common.yes') : t('common.no')} />
            <DetailItem label={t('order.paymentStatus')} value={crm.ApiOrdStatus} />
          </div>
        </div>
      </div>

      {(crm.ApiOrdDescriptionI || crm.ApiOrdDescriptionII || crm.ApiOrdNote) && (
        <div className="card">
          <div className="card-header">{t('order.notes')}</div>
          <div className="card-body detail-stack">
            {crm.ApiOrdNote && (
              <div>
                <strong>{t('order.note')}:</strong> {crm.ApiOrdNote}
              </div>
            )}
            {crm.ApiOrdDescriptionI && (
              <div>
                <strong>{t('order.desc1')}:</strong> {crm.ApiOrdDescriptionI}
              </div>
            )}
            {crm.ApiOrdDescriptionII && (
              <div>
                <strong>{t('order.desc2')}:</strong> {crm.ApiOrdDescriptionII}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">{t('order.documents')}</div>
        <div className="card-body table-responsive">
          {docsLoading ? (
            <div>{t('common.loading')}</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>{t('doc.id')}</th>
                  <th>{t('doc.registerDate')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-muted">No documents found.</td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.id}</td>
                      <td>{formatDate(doc.register_date)}</td>
                      <td className="text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/documents/${doc.id}`)}
                        >
                          {t('common.view')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
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
