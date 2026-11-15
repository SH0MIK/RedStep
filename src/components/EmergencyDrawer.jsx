import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { EMERGENCIES, PRIORITY, PRIORITY_LABEL } from '../content/survival.js'
import { Source } from './Atoms.jsx'
import './emergency.css'

/** Line icons for each emergency (stroke uses the current text colour). */
const ICONS = {
  leak: <><circle cx="12" cy="12" r="7.5" /><path d="M12 8v5" /><circle cx="12" cy="16" r="0.6" fill="currentColor" /><path d="M19.5 12h2.5M2 12h2.5" /></>,
  power: <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" />,
  suit: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 9.5a3.5 3 0 0 0 7 0" /><path d="M6 21v-2a6 6 0 0 1 12 0v2" /></>,
  fire: <path d="M12 22c4 0 6.5-2.6 6.5-6.3 0-3.4-2.2-5.4-3.6-7.3-.4 1.8-1.4 2.8-2.4 3.2.4-3.1-.8-6-3.5-8.6.2 3.4-1.4 5.3-2.8 7.1-1 1.3-1.7 3-1.7 5.1C4.5 19.3 7.6 22 12 22Z" />,
  dark: <><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" /><path d="M3 21h18" /></>,
}
const Icon = ({ k }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[k]}</svg>
)

export default function EmergencyDrawer({ state, onClose }) {
  const open = !!state
  const [active, setActive] = useState(EMERGENCIES[0].id)
  const [done, setDone] = useState({}) // steps ticked off, per emergency
  const panel = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!open) return
    if (state.focus) setActive(state.focus)
    lastFocus.current = document.activeElement
    panel.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('button, a[href], summary')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('keydown', key); lastFocus.current?.focus?.() }
  }, [open, state, onClose])

  const e = EMERGENCIES.find((x) => x.id === active)
  const ticks = done[active] || []
  const tick = (i) => setDone((d) => {
    const cur = new Set(d[active] || [])
    if (cur.has(i)) cur.delete(i)
    else cur.add(i)
    return { ...d, [active]: [...cur] }
  })

  return (
    <div className={`sos ${open ? 'sos-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="sos-scrim" onClick={onClose} />
      <aside className="sos-panel" role="dialog" aria-modal="true" aria-labelledby="sos-title" tabIndex={-1} ref={panel}>
        <header className="sos-head">
          <span className="sos-beacon" aria-hidden="true" />
          <p className="sos-kicker">Emergency</p>
          <button type="button" className="sos-close" onClick={onClose} aria-label="Close emergency guide">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        <h2 id="sos-title" className="sos-title">What happened?</h2>
        <div className="sos-pick" role="tablist" aria-label="What happened?">
          {EMERGENCIES.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={x.id === active} className="sos-card" onClick={() => setActive(x.id)}>
              <Icon k={x.icon} />
              <span>{x.name}</span>
            </button>
          ))}
        </div>

        {/* the order to work through: this emergency's first priority lights up */}
        <ol className="sos-order" aria-label="Order of priorities">
          {PRIORITY.map((p, i) => (
            <li key={p} className={e?.first === p ? 'hot' : ''} title={PRIORITY_LABEL[p].line}>
              <span className="sos-order-n">{i + 1}</span>
              {PRIORITY_LABEL[p].word}
            </li>
          ))}
        </ol>
        {e && <p className="sos-first"><b>Start with {PRIORITY_LABEL[e.first].word.toLowerCase()}.</b> {PRIORITY_LABEL[e.first].line}</p>}

        {e && (
          <div className="sos-body" role="tabpanel" aria-label={e.name}>
            <p className="sos-label">Do this now <span>{ticks.length}/{e.steps.length}</span></p>
            <ol className="sos-steps">
              {e.steps.map((s, i) => (
                <li key={s}>
                  <button type="button" aria-pressed={ticks.includes(i)} onClick={() => tick(i)}>
                    <span className="sos-step-n" aria-hidden="true">{ticks.includes(i) ? '✓' : i + 1}</span>
                    <span>{s}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="sos-proc">Proposed procedure, never tested on Mars.</p>
            <details className="sos-case">
              <summary>It really happened</summary>
              <p>{e.science} <Source k={e.source} badge="nasa" /></p>
            </details>
          </div>
        )}
        <Link to="/guide/emergency" className="btn btn-primary sos-drill" onClick={onClose}>Practise the drill <span className="arrow">→</span></Link>
      </aside>
    </div>
  )
}
