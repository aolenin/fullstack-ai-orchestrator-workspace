import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ShieldCheck, Activity, AlertTriangle } from 'lucide-react'
import './styles.css'

type Rule = { code: string; name: string; severity: string; trigger: string }
type RuleResult = { code: string; name: string; severity: string; triggered: boolean; reason: string }
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function App() {
  const [health, setHealth] = useState('loading')
  const [rules, setRules] = useState<Rule[]>([])
  const [results, setResults] = useState<RuleResult[]>([])

  useEffect(() => {
    fetch(`${API_BASE}/api/health/`).then(r => r.json()).then(d => setHealth(d.status)).catch(() => setHealth('down'))
    fetch(`${API_BASE}/api/rules/catalog/`).then(r => r.json()).then(d => setRules(d.rules || []))
  }, [])

  async function runDemo() {
    const payload = {
      bin_count_10m: 4,
      auth_capture_gap_hours: 12,
      capture_variance_pct: 5,
      duplicate_auth_count_1h: 1,
      velocity_pct_of_30d_avg: 240
    }
    const res = await fetch(`${API_BASE}/api/rules/evaluate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setResults(data.results || [])
  }

  return <main className="page">
    <section className="hero">
      <div>
        <p className="eyebrow">AI Risk Platform Scaffold</p>
        <h1>Orchestrated full-cycle engineering workspace</h1>
        <p>React SPA + Django + PostgreSQL + Kubernetes + ArgoCD + Claude sub-agents.</p>
      </div>
      <div className="status"><ShieldCheck /> Backend: <b>{health}</b></div>
    </section>

    <section className="grid">
      <div className="card">
        <h2><Activity /> Dynamic Rules Catalog</h2>
        {rules.map(r => <div className="row" key={r.code}><b>{r.name}</b><span>{r.severity}</span><small>{r.trigger}</small></div>)}
      </div>
      <div className="card">
        <h2><AlertTriangle /> Demo Evaluation</h2>
        <button onClick={runDemo}>Run demo payload</button>
        {results.map(r => <div className={r.triggered ? 'row triggered' : 'row'} key={r.code}><b>{r.name}</b><span>{r.triggered ? 'TRIGGERED' : 'clear'}</span><small>{r.reason}</small></div>)}
      </div>
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
