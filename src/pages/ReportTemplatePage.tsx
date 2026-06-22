import { useEffect, useState } from 'react'
import {
  deleteReportTemplate,
  getReportTemplate,
  saveReportTemplate,
} from '../api/reportTemplate'
import { ErrorAlert, SuccessAlert } from '../components/Alert'
import { Loading } from '../components/Loading'

export function ReportTemplatePage() {
  const [content, setContent] = useState('')
  const [original, setOriginal] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    getReportTemplate()
      .then((template) => {
        setOriginal(template)
        setContent(template ?? '')
      })
      .catch(() => setError('Failed to load report template.'))
      .finally(() => setLoading(false))
  }, [])

  const hasChanges = content !== (original ?? '')
  const hasTemplate = original !== null && original !== ''

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const message = await saveReportTemplate(content)
      setOriginal(content)
      setSuccess(message)
    } catch {
      setError('Failed to save report template.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!hasTemplate) return
    if (!window.confirm('Are you sure you want to delete the report template?')) return

    setDeleting(true)
    setError(null)
    setSuccess(null)
    try {
      const message = await deleteReportTemplate()
      setOriginal(null)
      setContent('')
      setShowPreview(false)
      setSuccess(message)
    } catch {
      setError('Failed to delete report template.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading message="Loading report template..." />

  return (
    <div className="page">
      <div className="content-header">
        <h1>Report Template</h1>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPreview((v) => !v)}
            disabled={!content}
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving ? 'Saving...' : 'Save Template'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting || !hasTemplate}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

      <div className="card">
        <div className="card-header">HTML Template</div>
        <div className="card-body">
          <textarea
            className="form-control template-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="No template yet. Paste or write HTML here..."
            spellCheck={false}
          />
        </div>
      </div>

      {showPreview && content && (
        <div className="card">
          <div className="card-header">Preview</div>
          <div className="card-body">
            <iframe
              title="Template preview"
              className="template-preview"
              srcDoc={content}
              sandbox=""
            />
          </div>
        </div>
      )}
    </div>
  )
}
