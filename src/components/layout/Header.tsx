import { useI18n } from '../../context/I18nContext'
import { useTheme } from '../../context/ThemeContext'
import type { Language } from '../../utils/translations'

export function Header() {
  const { t, language, setLanguage } = useI18n()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else {
      // If system, force toggle based on current actual theme
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(isSystemDark ? 'light' : 'dark')
    }
  }

  return (
    <header className="main-header">
      <div className="header-title">{t('header.title')}</div>
      <div className="header-actions">
        <select 
          className="form-control form-control-sm"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{ width: 'auto' }}
        >
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
