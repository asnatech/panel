import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDocuments } from '../api/documents'
import { ErrorAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import type { DocumentListItem } from '../types'
import { formatDate } from '../utils/panels'
import { useI18n } from '../context/I18nContext'

export function DocumentsPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [documents, setDocuments] = useState<DocumentListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDocuments()
      .then(setDocuments)
      .catch(() => setError('Failed to load documents.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading message={t('common.loading')} />
  if (error) return <ErrorAlert message={error} />

  return (
    <div className="page">
      <div className="content-header">
        <h1>{t('nav.documents')}</h1>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>{t('doc.id')}</th>
                <th>{t('doc.orderId')}</th>
                <th>{t('doc.registerDate')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-muted">
                    No documents found.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.id}</td>
                    <td>{doc.order_id}</td>
                    <td>{formatDate(doc.register_date)}</td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
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
        </div>
      </div>
    </div>
  )
}
