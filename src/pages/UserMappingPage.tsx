import { useEffect, useMemo, useState } from 'react'
import { getUserMapping, updateUserMapping } from '../api/userMapping'
import { ErrorAlert, SuccessAlert } from '../components/Alert'
import { Loading } from '../components/Loading'
import type { MappingMatrix, UserMappingData } from '../types'

export function UserMappingPage() {
  const [data, setData] = useState<UserMappingData | null>(null)
  const [draft, setDraft] = useState<MappingMatrix>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    getUserMapping()
      .then((result) => {
        setData(result)
        setDraft(structuredClone(result.mapping))
      })
      .catch(() => setError('Failed to load user mappings.'))
      .finally(() => setLoading(false))
  }, [])

  const changes = useMemo(() => {
    if (!data) return {}
    const diff: MappingMatrix = {}
    for (const product of data.products) {
      const productKey = String(product.id)
      for (const warehouse of data.warehouses) {
        const warehouseKey = String(warehouse.id)
        const original = data.mapping[productKey]?.[warehouseKey] ?? 0
        const current = draft[productKey]?.[warehouseKey] ?? 0
        if (original !== current) {
          if (!diff[productKey]) diff[productKey] = {}
          diff[productKey][warehouseKey] = current
        }
      }
    }
    return diff
  }, [data, draft])

  const changeCount = useMemo(
    () =>
      Object.values(changes).reduce(
        (sum, warehouses) => sum + Object.keys(warehouses).length,
        0,
      ),
    [changes],
  )

  function updateCell(productId: number, warehouseId: number, userId: number) {
    const productKey = String(productId)
    const warehouseKey = String(warehouseId)
    setDraft((prev) => ({
      ...prev,
      [productKey]: {
        ...(prev[productKey] ?? {}),
        [warehouseKey]: userId,
      },
    }))
  }

  async function handleSave() {
    if (changeCount === 0) return
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const message = await updateUserMapping(changes)
      setSuccess(message)
      const refreshed = await getUserMapping()
      setData(refreshed)
      setDraft(structuredClone(refreshed.mapping))
    } catch {
      setError('Failed to save mappings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading message="Loading user mappings..." />
  if (error && !data) return <ErrorAlert message={error} />
  if (!data) return <ErrorAlert message="No mapping data available." />

  return (
    <div className="page">
      <div className="content-header">
        <h1>User Mapping</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving || changeCount === 0}
        >
          {saving ? 'Saving...' : `Save Changes (${changeCount})`}
        </button>
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
      {success && <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />}

      <div className="card">
        <div className="card-body table-responsive mapping-table-wrap">
          <table className="table table-bordered mapping-table">
            <thead>
              <tr>
                <th className="sticky-col">Product</th>
                {data.warehouses.map((warehouse) => (
                  <th key={warehouse.id}>{warehouse.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => {
                const productKey = String(product.id)
                return (
                  <tr key={product.id}>
                    <td className="sticky-col product-name">{product.name}</td>
                    {data.warehouses.map((warehouse) => {
                      const warehouseKey = String(warehouse.id)
                      const value = draft[productKey]?.[warehouseKey] ?? 0
                      const original = data.mapping[productKey]?.[warehouseKey] ?? 0
                      const isChanged = value !== original
                      return (
                        <td key={warehouse.id} className={isChanged ? 'cell-changed' : undefined}>
                          <select
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) =>
                              updateCell(product.id, warehouse.id, Number(e.target.value))
                            }
                          >
                            <option value={0}>— Unassigned —</option>
                            {data.users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.username} (#{user.id})
                              </option>
                            ))}
                          </select>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
