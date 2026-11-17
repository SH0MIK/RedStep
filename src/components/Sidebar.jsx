// Apple-style collapsible sidebar: a floating translucent panel with a sidebar toggle,
// grouped sections and quiet rows. Used for details, references and the manual.
import { useEffect } from 'react'
import { shortcut } from '../lib/platform.js'
import './sidebar.css'

export function SidebarIcon() {
  return (
    <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
      <rect x="1" y="1" width="18" height="14" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="7.2" y1="1.5" x2="7.2" y2="14.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3.2" y1="5" x2="5.2" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="3.2" y1="7.6" x2="5.2" y2="7.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/** Phones: the panel is a bottom sheet, so its buttons show a sheet, not a sidebar.
 *  `down` is the hide button (a chevron), otherwise the sheet rising from the bottom edge. */
export function SheetIcon({ down = false }) {
  return down ? (
    <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
      <path d="M5 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
      <rect x="1" y="1" width="18" height="14" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.7 8.6h16.6" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="11.4" x2="12" y2="11.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Sidebar({ open, onToggle, title, side = 'left', className = '', header, children, footer, label, reopenBadge }) {
  const keys = shortcut('Shift', 'S')
  useEffect(() => {
    const key = (e) => {
      // macOS-style shortcut: Ctrl/Cmd + Shift + S toggles the sidebar
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 's') { e.preventDefault(); onToggle() }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [onToggle])
  return (
    <>
      <aside className={`sb sb-${side} ${open ? 'sb-open' : ''} ${className}`} aria-label={label || title} inert={!open}>
        <div className="sb-top">
          <button type="button" className="sb-toggle" onClick={onToggle} aria-label="Hide panel" title={`Hide panel (${keys})`}>
            <span className="sb-ic-side"><SidebarIcon /></span>
            <span className="sb-ic-sheet"><SheetIcon down /></span>
          </button>
          {title && <p className="sb-title">{title}</p>}
        </div>
        {header && <div className="sb-header">{header}</div>}
        <div className="sb-body">{children}</div>
        {footer && <div className="sb-footer">{footer}</div>}
      </aside>
      <button type="button" className={`sb-reopen sb-reopen-${side} ${open ? '' : 'show'}`} onClick={onToggle} aria-label="Show panel" title={`Show panel (${keys})`} tabIndex={open ? -1 : 0}>
        <span className="sb-ic-side"><SidebarIcon /></span>
        <span className="sb-ic-sheet"><SheetIcon /></span>
        {reopenBadge}
      </button>
    </>
  )
}

export function SbSection({ title, children, action }) {
  return (
    <section className="sb-sec">
      {title && (
        <div className="sb-sec-head">
          <h3>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function SbRow({ icon, tone = 'rust', title, sub, onClick, selected, trailing }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag type={onClick ? 'button' : undefined} className={`sb-row ${selected ? 'sel' : ''}`} onClick={onClick} aria-pressed={onClick ? !!selected : undefined}>
      {icon !== undefined && <span className={`sb-icon sb-icon-${tone}`} aria-hidden="true">{icon}</span>}
      <span className="sb-row-text">
        <span className="sb-row-title">{title}</span>
        {sub && <span className="sb-row-sub">{sub}</span>}
      </span>
      {trailing}
    </Tag>
  )
}

/** Disclosure group (like a Finder sidebar group): collapsed details that open on demand. */
export function SbDisclosure({ title, children, defaultOpen = false }) {
  return (
    <details className="sb-disc" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="sb-disc-body">{children}</div>
    </details>
  )
}
