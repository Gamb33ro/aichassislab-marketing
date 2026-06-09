'use client'

import { useState } from 'react'

const PLANS = {
  standard:   { label: 'Standard Core',   defaultUsers: 100, fee: 350 },
  enterprise: { label: 'Enterprise Lite', defaultUsers: 100, fee: 500 },
} as const

type PlanKey = keyof typeof PLANS

const API_COST_PER_USER = 10

export default function ClientCalculator() {
  const [editMode,     setEditMode]     = useState(false)
  const [charge,       setCharge]       = useState(50)
  const [plan,         setPlan]         = useState<PlanKey>('standard')
  const [users,        setUsers]        = useState(100)
  const [showBreakeven, setShowBreakeven] = useState(false)

  const fee           = PLANS[plan].fee
  const grossRevenue  = charge * users
  const apiOverhead   = API_COST_PER_USER * users
  const monthlyMargin = grossRevenue - fee - apiOverhead
  const annual        = monthlyMargin * 12
  const isNeg         = monthlyMargin < 0

  // Break-even calculations
  // profit = (charge - API_COST_PER_USER) * users - fee = 0
  const canBreakByUsers  = charge > API_COST_PER_USER
  const minUsers         = canBreakByUsers
    ? Math.ceil(fee / (charge - API_COST_PER_USER))
    : null
  // min charge (exact): fee/users + API_COST_PER_USER — round up to nearest cent
  const minChargeExact   = fee / users + API_COST_PER_USER
  const minCharge        = Math.ceil(minChargeExact * 100) / 100

  function handlePlanChange(newPlan: PlanKey) {
    setPlan(newPlan)
    setUsers(PLANS[newPlan].defaultUsers)
  }

  function reset() {
    setCharge(50)
    setPlan('standard')
    setUsers(100)
    setEditMode(false)
    setShowBreakeven(false)
  }

  function fmt(n: number) {
    return n < 0
      ? `-$${Math.abs(n).toLocaleString()}`
      : `~$${n.toLocaleString()}`
  }

  return (
    <div className="glass-card-featured pricing-rec-calc reveal">
      <div className="pricing-calc-header">
        <div className="pricing-rec-calc-title">Margin calculator</div>
        <button
          className="pricing-calc-try-btn"
          onClick={() => (editMode ? reset() : setEditMode(true))}
          type="button"
        >
          {editMode ? '← Reset' : 'Try it →'}
        </button>
      </div>

      {/* Row 1 — charge */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">
          What you charge per user
          {editMode && charge <= API_COST_PER_USER && (
            <span style={{ display: 'block', fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>
              Tip: charge over $10/mo to cover the API overhead per user
            </span>
          )}
        </span>
        {editMode ? (
          <span className="pricing-calc-input-group">
            <span className="pricing-calc-prefix">$</span>
            <input
              className="pricing-calc-input"
              type="number"
              min={0}
              value={charge}
              onChange={e => setCharge(Math.max(0, Number(e.target.value)))}
            />
            <span className="pricing-calc-suffix">/mo</span>
          </span>
        ) : (
          <span className="pricing-calc-value">${charge}/mo</span>
        )}
      </div>

      {/* Row 2 — user count */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Number of active users</span>
        {editMode ? (
          <span className="pricing-calc-input-group">
            <input
              className="pricing-calc-input"
              type="number"
              min={1}
              value={users}
              onChange={e => setUsers(Math.max(1, Number(e.target.value)))}
            />
          </span>
        ) : (
          <span className="pricing-calc-value">{users.toLocaleString()}</span>
        )}
      </div>

      {/* Row 3 — plan */}
      <div className={`pricing-calc-row${editMode ? ' pricing-calc-row-select' : ''}`}>
        <span className="pricing-calc-label">AIChassisLab plan</span>
        {editMode ? (
          <select
            className="pricing-calc-select"
            value={plan}
            onChange={e => handlePlanChange(e.target.value as PlanKey)}
          >
            <option value="standard">Standard Core — $350/mo</option>
            <option value="enterprise">Enterprise Lite — $500/mo</option>
          </select>
        ) : (
          <span className="pricing-calc-value">{PLANS[plan].label} — ${fee.toLocaleString()}/mo</span>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', margin: '8px 0 4px' }} />

      {/* Gross revenue */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Gross revenue collected</span>
        <span className="pricing-calc-value">${grossRevenue.toLocaleString()}/mo</span>
      </div>

      {/* Platform cost */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Your fixed platform cost</span>
        <span className="pricing-calc-value">−${fee.toLocaleString()}/mo</span>
      </div>

      {/* API overhead */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">API overhead (direct to provider) *</span>
        <span className="pricing-calc-value">~−${apiOverhead.toLocaleString()}/mo</span>
      </div>

      <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', margin: '8px 0 4px' }} />

      {/* Monthly margin */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Net monthly margin</span>
        <div style={{ textAlign: 'right' }}>
          <span className={`pricing-calc-value accent${isNeg ? ' negative' : ' positive'}`}>
            {fmt(monthlyMargin)}/mo
          </span>
          {isNeg && (
            <div className="pricing-calc-neg-note">Consider raising your per-user price.</div>
          )}
        </div>
      </div>

      {/* Annual */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Annual</span>
        <span className={`pricing-calc-value accent${isNeg ? ' negative' : ' positive'}`}>
          {fmt(annual)}/yr
        </span>
      </div>

      {/* Break-even toggle */}
      <button
        className="pricing-calc-breakeven-btn"
        onClick={() => setShowBreakeven(v => !v)}
        type="button"
      >
        {showBreakeven ? '▲ Hide' : '▼ See minimum usage and price to break a profit'}
      </button>

      {showBreakeven && (
        <div className="pricing-calc-breakeven-panel">
          <div className="pricing-calc-breakeven-row">
            <span className="pricing-calc-label">Min users at ${charge}/user</span>
            <span className="pricing-calc-value">
              {canBreakByUsers
                ? `${minUsers!.toLocaleString()} users`
                : 'Impossible — charge must exceed $10/user'}
            </span>
          </div>
          <div className="pricing-calc-breakeven-row">
            <span className="pricing-calc-label">Min price with {users.toLocaleString()} users</span>
            <span className="pricing-calc-value">${minCharge.toFixed(2)}/user/mo</span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '6px 0 0', lineHeight: 1.5 }}>
            Any combination above these thresholds generates profit. API costs
            are ~$10/user/mo — your price per user must exceed this to have
            margin left after covering the platform fee.
          </p>
        </div>
      )}

      <p className="pricing-rec-footnote">
        * Paid directly to OpenAI / Anthropic via your secure key based on raw
        usage. Estimated at ~$10/user/mo for a heavy daily user — light users
        cost significantly less.
      </p>
    </div>
  )
}
