import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDocument, getDocumentPdf } from '../api/documents'
import { ErrorAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import type { DocumentDetail } from '../types'
import { formatDate } from '../utils/panels'
import { useI18n } from '../context/I18nContext'

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const documentId = Number(id)
  const { t } = useI18n()
  const [document, setDocument] = useState<DocumentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  useEffect(() => {
    if (!documentId) return
    getDocument(documentId)
      .then(setDocument)
      .catch(() => setError('Failed to load document details.'))
      .finally(() => setLoading(false))
  }, [documentId])

  async function handlePdf() {
    if (!documentId) return
    setPdfLoading(true)
    setError(null)
    try {
      const blob = await getDocumentPdf(documentId)
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank', 'noopener,noreferrer')
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch {
      setError('Failed to retrieve PDF.')
    } finally {
      setPdfLoading(false)
    }
  }

  if (loading) return <Loading message={t('common.loading')} />
  if (error && !document) return <ErrorAlert message={error} />
  if (!document) return <ErrorAlert message="Document not found." />

  const crm = document.ideal_crm

  return (
    <div className="page">
      <div className="content-header">
        <div>
          <Link to="/documents" className="back-link">
            ← {t('common.back')}
          </Link>
          <h1>{t('nav.documents')} #{document.id}</h1>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePdf}
          disabled={pdfLoading}
        >
          {pdfLoading ? t('common.loading') : 'Print / PDF'}
        </button>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <div className="card">
        <div className="card-header">{t('order.overview')}</div>
        <div className="card-body">
          <div className="detail-grid">
            <DetailItem label={t('doc.orderId')} value={document.order_id} />
            <DetailItem label={t('doc.registerDate')} value={formatDate(document.register_date)} />
            <DetailItem label="Document Number" value={crm.ApiDocNumber} />
            <DetailItem label={t('order.operation')} value={crm.ApiOpr} />
            <DetailItem label="Warehouse" value={crm.ApiWH} />
            <DetailItem label={t('order.company')} value={crm.ApiCompany} />
            <DetailItem label={t('order.contactPerson')} value={crm.ApiCompanyPerson} />
            <DetailItem label={t('order.project')} value={crm.ApiProject} />
            <DetailItem label="Edited By" value={crm.ApiEditUser} />
            <DetailItem label="First Registered By" value={crm.ApiFirstRegisterUser} />
            <DetailItem label="First Register Date" value={crm.ApiFirstRegisterDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}
