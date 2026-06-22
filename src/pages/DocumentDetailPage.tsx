import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDocument, getDocumentPdf } from '../api/documents'
import { ErrorAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import type { DocumentDetail } from '../types'
import { formatDate } from '../utils/panels'

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const documentId = Number(id)
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

  if (loading) return <Loading message="Loading document..." />
  if (error && !document) return <ErrorAlert message={error} />
  if (!document) return <ErrorAlert message="Document not found." />

  const crm = document.ideal_crm

  return (
    <div className="page">
      <div className="content-header">
        <div>
          <Link to="/documents" className="back-link">
            ← Back to Documents
          </Link>
          <h1>Document #{document.id}</h1>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePdf}
          disabled={pdfLoading}
        >
          {pdfLoading ? 'Loading PDF...' : 'Print / PDF'}
        </button>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <div className="card">
        <div className="card-header">Overview</div>
        <div className="card-body">
          <div className="detail-grid">
            <DetailItem label="Order ID" value={document.order_id} />
            <DetailItem label="Register Date" value={formatDate(document.register_date)} />
            <DetailItem label="Document Number" value={crm.ApiDocNumber} />
            <DetailItem label="Operation" value={crm.ApiOpr} />
            <DetailItem label="Warehouse" value={crm.ApiWH} />
            <DetailItem label="Company" value={crm.ApiCompany} />
            <DetailItem label="Contact Person" value={crm.ApiCompanyPerson} />
            <DetailItem label="Project" value={crm.ApiProject} />
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
