import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDocuments } from '../api/documents'
import { ErrorAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import type { DocumentListItem } from '../types'
import { formatDate } from '../utils/panels'

export function DocumentsPage() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState<DocumentListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDocuments()
      .then(setDocuments)
      .catch(() => setError('Failed to load documents.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading message="Loading documents..." />
  if (error) return <ErrorAlert message={error} />

  return (
    <div className="page">
      <div className="content-header">
        <h1>Documents</h1>
      </div>
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order ID</th>
                <th>Register Date</th>
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
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/documents/${doc.id}`)}
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
