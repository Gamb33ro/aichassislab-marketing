'use client'

import { useState } from 'react'

const PLANS = {
  build:     { label: 'Pro (200 users)',        users: 200, fee: 1520 },
  production:{ label: 'Enterprise (500 users)', users: 500, fee: 3320 },
} as const

type PlanKey = keyof typeof PLANS

export default function ClientCalculator() {
  const [editMode, setEditMode] = useState(false)
  const [charge,   setCharge]   = useState(25)
  const [apiCost,  setApiCost]  = useState(8)
  const [plan,     setPlan]     = useState<PlanKey>('build')

  const { users, fee } = PLANS[plan]
  const monthlyMargin = (charge - apiCost) * users - fee
  const annual = monthlyMargin * 12
  const isNeg  = monthlyMargin < 0

  function reset() {
    setCharge(25)
    setApiCost(8)
    setPlan('build')
    setEditMode(false)
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

      {/* Row 1 */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">What you charge per user</span>
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

      {/* Row 2 */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Typical API cost (heavy user)</span>
        {editMode ? (
          <span className="pricing-calc-input-group">
            <span className="pricing-calc-prefix">~$</span>
            <input
              className="pricing-calc-input"
              type="number"
              min={0}
              value={apiCost}
              onChange={e => setApiCost(Math.max(0, Number(e.target.value)))}
            />
            <span className="pricing-calc-suffix">/mo</span>
          </span>
        ) : (
          <span className="pricing-calc-value">~${apiCost}/mo</span>
        )}
      </div>

      {/* Row 3 — plan / fee */}
      <div className={`pricing-calc-row${editMode ? ' pricing-calc-row-select' : ''}`}>
        <span className="pricing-calc-label">
          {editMode ? 'Platform plan' : `Platform fee (${PLANS[plan].label})`}
        </span>
        {editMode ? (
          <select
            className="pricing-calc-select"
            value={plan}
            onChange={e => setPlan(e.target.value as PlanKey)}
          >
            <option value="build">Pro (200 users) — $1,520/mo</option>
            <option value="production">Enterprise (500 users) — $3,320/mo</option>
          </select>
        ) : (
          <span className="pricing-calc-value">${fee.toLocaleString()}/mo</span>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', margin: '8px 0 4px' }} />

      {/* Monthly margin */}
      <div className="pricing-calc-row">
        <span className="pricing-calc-label">Monthly margin at {users} users</span>
        <div style={{ textAlign: 'right' }}>
          <span className={`pricing-calc-value accent${isNeg ? ' negative' : ''}`}>
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
        <span className={`pricing-calc-value accent${isNeg ? ' negative' : ''}`}>
          {fmt(annual)}/yr
        </span>
      </div>

      <p className="pricing-rec-footnote">
        * Based on observed usage patterns from active daily users.
        Light users will cost significantly less.
      </p>
    </div>
  )
}
