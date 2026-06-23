import { useI18n } from '../../context/I18nContext'
import type { Language } from '../../utils/translations'

export function Header() {
  const { t, language, setLanguage } = useI18n()

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
      </div>
    </header>
  )
}
