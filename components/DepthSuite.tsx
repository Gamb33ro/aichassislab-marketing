const MODULES = [
  {
    label: 'The Practice',
    visual: (
      <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ds-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid */}
        {[25, 55, 85].map(y => (
          <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <path
          d="M10 100 L45 78 L75 88 L105 45 L130 60 L158 28 L180 42 L190 36 L190 130 L10 130 Z"
          fill="url(#ds-chart-fill)"
        />
        {/* Chart line */}
        <path
          d="M10 100 L45 78 L75 88 L105 45 L130 60 L158 28 L180 42 L190 36"
          stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Highlight points */}
        <circle cx="105" cy="45" r="3.5" fill="#C9A84C" />
        <circle cx="158" cy="28" r="3.5" fill="#C9A84C" />
        {/* Error annotation */}
        <line x1="75" y1="88" x2="75" y2="108" stroke="rgba(239,68,68,0.5)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="75" cy="88" r="3" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="1.2" />
        <text x="79" y="117" fontSize="8" fill="rgba(239,68,68,0.55)" fontFamily="monospace">error</text>
      </svg>
    ),
    desc: "An interactive session that engages students on their specific errors and blind spots within your subject — then remembers every pattern across sessions, so each practice builds directly on the last.",
  },
  {
    label: 'The Mirror',
    visual: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Concentric ovals — mirror depth */}
        {[
          { rx: 78, ry: 88, o: 0.12 },
          { rx: 60, ry: 70, o: 0.16 },
          { rx: 42, ry: 52, o: 0.22 },
          { rx: 25, ry: 33, o: 0.32 },
          { rx: 10, ry: 14, o: 0.5  },
        ].map(({ rx, ry, o }, i) => (
          <ellipse key={i} cx="100" cy="100" rx={rx} ry={ry}
            stroke={`rgba(201,168,76,${o})`} strokeWidth={i === 0 ? 0.8 : 1} />
        ))}
        {/* Vertical axis — the "mirror line" */}
        <line x1="100" y1="12" x2="100" y2="188"
          stroke="rgba(201,168,76,0.12)" strokeWidth="1" strokeDasharray="4 5" />
        {/* Horizontal axis */}
        <line x1="22" y1="100" x2="178" y2="100"
          stroke="rgba(201,168,76,0.07)" strokeWidth="1" />
        {/* Reflection shimmer */}
        <ellipse cx="76" cy="68" rx="7" ry="18" fill="rgba(255,255,255,0.04)"
          transform="rotate(-22 76 68)" />
      </svg>
    ),
    desc: "Draws on the full arc of a student's conversation history to surface patterns, contradictions, and beliefs they couldn't see from inside the work — a reflection built entirely from their own words.",
  },
  {
    label: 'The Scenario',
    visual: (
      <svg viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Root node */}
        <circle cx="100" cy="28" r="11" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" fill="rgba(201,168,76,0.08)" />
        <text x="100" y="32" textAnchor="middle" fontSize="8" fill="rgba(201,168,76,0.8)" fontFamily="monospace">YOU</text>
        {/* Branches to mid-nodes */}
        <line x1="100" y1="39" x2="58" y2="82" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        <line x1="100" y1="39" x2="142" y2="82" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
        {/* Mid-level nodes */}
        <circle cx="58" cy="90" r="8" stroke="rgba(201,168,76,0.35)" strokeWidth="1" fill="rgba(201,168,76,0.06)" />
        <circle cx="142" cy="90" r="8" stroke="rgba(201,168,76,0.55)" strokeWidth="1.4" fill="rgba(201,168,76,0.12)" />
        {/* Leaf branches */}
        <line x1="58" y1="98" x2="36" y2="135" stroke="rgba(201,168,76,0.18)" strokeWidth="1" />
        <line x1="58" y1="98" x2="78" y2="135" stroke="rgba(201,168,76,0.18)" strokeWidth="1" />
        <line x1="142" y1="98" x2="120" y2="135" stroke="rgba(201,168,76,0.22)" strokeWidth="1" />
        <line x1="142" y1="98" x2="164" y2="135" stroke="rgba(201,168,76,0.22)" strokeWidth="1" />
        {/* Leaf nodes */}
        <circle cx="36"  cy="141" r="6" stroke="rgba(201,168,76,0.2)"  strokeWidth="1" fill="rgba(201,168,76,0.04)" />
        <circle cx="78"  cy="141" r="6" stroke="rgba(201,168,76,0.2)"  strokeWidth="1" fill="rgba(201,168,76,0.04)" />
        <circle cx="120" cy="141" r="6" stroke="rgba(201,168,76,0.28)" strokeWidth="1" fill="rgba(201,168,76,0.06)" />
        <circle cx="164" cy="141" r="6.5" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" fill="rgba(201,168,76,0.18)" />
        {/* "Best path" highlight on rightmost leaf */}
        <line x1="142" y1="98" x2="164" y2="135" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5" />
      </svg>
    ),
    desc: "Places students inside a live situation drawn from your curriculum. The AI takes every opposing role — client, examiner, market, counterpart — then debriefs their decisions against your exact framework.",
  },
]

const BULLETS = [
  "Every module runs on your content — the AI knows your curriculum specifically, not a generic approximation.",
  "Students engage through structured practice, not passive reading. The AI creates friction, asks hard questions, and refuses to let weak answers slide.",
  "Sessions compound: the AI tracks what each student struggled with and returns to it, making the next session harder and more precise than the last.",
  "Modules are custom-built for your subject matter — the Practice, Mirror, and Scenario are templates, not products. They are rebuilt around what you teach.",
  "The architecture is drawn from Sophego's Ego Mapper — seven practice modules designed to produce real psychological change through repeated, AI-guided engagement. The same logic applies to any domain.",
  "Students leave with something that transfers to real situations — not just a better score on a quiz.",
]

export default function DepthSuite() {
  return (
    <section className="ds-section reveal">
      <div className="ds-inner">

        {/* Header */}
        <div className="ds-header">
          <div className="ds-enterprise-badge">Enterprise only</div>
          <h2 className="ds-headline">The Depth Suite</h2>
          <p className="ds-subhead">
            Most AI tools answer questions. The Depth Suite makes students do the work.
            It is a category of structured exercises and practices — built on your content,
            powered by the best available AI — designed to help students actually exercise
            what they learned, not just review it.
          </p>
        </div>

        {/* Three widgets */}
        <div className="ds-widgets">
          {MODULES.map(mod => (
            <div key={mod.label} className="ds-widget">
              <div className="ds-widget-visual">
                {mod.visual}
              </div>
              <div className="ds-widget-label">{mod.label}</div>
              <p className="ds-widget-desc">{mod.desc}</p>
            </div>
          ))}
        </div>

        {/* Bullet points */}
        <div className="ds-bullets-wrap">
          <div className="ds-bullets-label">What this means in practice</div>
          <ul className="ds-bullets" role="list">
            {BULLETS.map(b => (
              <li key={b} className="ds-bullet">{b}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
