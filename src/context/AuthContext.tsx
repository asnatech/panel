import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getPanels, login as loginApi } from '../api/auth'
import { clearToken, getToken, setToken, setUnauthorizedHandler } from '../api/client'
import type { PanelId } from '../types'

interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  panels: PanelId[]
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  refreshPanels: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken())
  const [isLoading, setIsLoading] = useState(() => !!getToken())
  const [panels, setPanels] = useState<PanelId[]>([])

  const logout = useCallback(() => {
    clearToken()
    setIsAuthenticated(false)
    setPanels([])
    setIsLoading(false)
  }, [])

  const refreshPanels = useCallback(async () => {
    const data = await getPanels()
    setPanels(data as PanelId[])
  }, [])

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await loginApi({ username, password })
      setToken(response.access_token)
      setIsAuthenticated(true)
      await refreshPanels()
    },
    [refreshPanels],
  )

  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)

    refreshPanels()
      .catch(() => {
        if (!cancelled) logout()
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, logout, refreshPanels])

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      panels,
      login,
      logout,
      refreshPanels,
    }),
    [isAuthenticated, isLoading, panels, login, logout, refreshPanels],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
