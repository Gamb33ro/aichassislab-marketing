const chartSvg = (
  <svg viewBox="0 0 200 145" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="ch-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Axes */}
    <line x1="16" y1="18" x2="16" y2="122" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <line x1="16" y1="122" x2="194" y2="122" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

    {/* Horizontal grid */}
    {([35, 58, 80, 100] as number[]).map(y => (
      <line key={y} x1="16" y1={y} x2="194" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    ))}

    {/* Uptrend area fill (C1–C4) */}
    <path
      d="M22 84 L40 74 L58 62 L76 50 L94 40 L94 122 L22 122 Z"
      fill="url(#ch-area)"
    />

    {/* C1 x=22 green */}
    <line x1="22" y1="70" x2="22" y2="94" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="18" y="74" width="8" height="14" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C2 x=40 green */}
    <line x1="40" y1="60" x2="40" y2="87" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="36" y="64" width="8" height="16" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C3 x=58 green */}
    <line x1="58" y1="48" x2="58" y2="78" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="54" y="52" width="8" height="16" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C4 x=76 green */}
    <line x1="76" y1="36" x2="76" y2="68" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="72" y="40" width="8" height="16" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C5 x=94 — BIG RED ERROR candle */}
    <line x1="94" y1="36" x2="94" y2="116" stroke="#ef4444" strokeWidth="1.5" />
    <rect x="90" y="38" width="8" height="72" fill="rgba(239,68,68,0.28)" stroke="#ef4444" strokeWidth="1.4" />
    {/* Annotation: dashed red circle */}
    <circle cx="94" cy="74" r="17" stroke="rgba(239,68,68,0.6)" strokeWidth="1.2" strokeDasharray="3 2" />
    {/* Red triangle warning marker above wick */}
    <polygon points="94,22 88.5,31 99.5,31" fill="rgba(239,68,68,0.75)" />

    {/* C6 x=112 small red */}
    <line x1="112" y1="95" x2="112" y2="118" stroke="#ef4444" strokeWidth="1.2" />
    <rect x="108" y="98" width="8" height="14" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1" />

    {/* C7 x=130 green recovery */}
    <line x1="130" y1="85" x2="130" y2="112" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="126" y="88" width="8" height="14" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C8 x=148 green */}
    <line x1="148" y1="77" x2="148" y2="107" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="144" y="81" width="8" height="14" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C9 x=166 green */}
    <line x1="166" y1="70" x2="166" y2="100" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="162" y="74" width="8" height="13" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* C10 x=184 green */}
    <line x1="184" y1="63" x2="184" y2="93" stroke="#4ade80" strokeWidth="1.2" />
    <rect x="180" y="67" width="8" height="13" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="1" />

    {/* Moving average line — dashed gold */}
    <path
      d="M22 81 L40 71 L58 60 L76 49 L94 68 L112 107 L130 96 L148 88 L166 81 L184 74"
      stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" strokeDasharray="5 3"
      strokeLinecap="round" strokeLinejoin="round"
    />

    {/* Volume bars */}
    <rect x="18"  y="125" width="8" height="5"  fill="rgba(74,222,128,0.28)"  rx="1" />
    <rect x="36"  y="124" width="8" height="6"  fill="rgba(74,222,128,0.28)"  rx="1" />
    <rect x="54"  y="123" width="8" height="7"  fill="rgba(74,222,128,0.28)"  rx="1" />
    <rect x="72"  y="124" width="8" height="6"  fill="rgba(74,222,128,0.28)"  rx="1" />
    <rect x="90"  y="117" width="8" height="13" fill="rgba(239,68,68,0.45)"   rx="1" />
    <rect x="108" y="122" width="8" height="8"  fill="rgba(239,68,68,0.32)"   rx="1" />
    <rect x="126" y="125" width="8" height="5"  fill="rgba(74,222,128,0.22)"  rx="1" />
    <rect x="144" y="125" width="8" height="5"  fill="rgba(74,222,128,0.22)"  rx="1" />
    <rect x="162" y="126" width="8" height="4"  fill="rgba(74,222,128,0.22)"  rx="1" />
    <rect x="180" y="126" width="8" height="4"  fill="rgba(74,222,128,0.22)"  rx="1" />
  </svg>
)

const mirrorSvg = (
  <svg viewBox="0 0 200 248" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="mi-glass" cx="38%" cy="30%" r="70%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.08)" />
        <stop offset="45%"  stopColor="rgba(201,168,76,0.03)"  />
        <stop offset="100%" stopColor="rgba(0,0,0,0.55)"       />
      </radialGradient>
    </defs>

    {/* Handle */}
    <rect x="82" y="190" width="36" height="50" rx="14"
      fill="rgba(201,168,76,0.07)" stroke="rgba(201,168,76,0.72)" strokeWidth="2.5" />
    <rect x="88" y="190" width="24" height="50" rx="10"
      fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.8" />
    <line x1="82" y1="211" x2="118" y2="211" stroke="rgba(201,168,76,0.38)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="82" y1="224" x2="118" y2="224" stroke="rgba(201,168,76,0.22)" strokeWidth="1"   strokeLinecap="round" />

    {/* Glass fill */}
    <ellipse cx="100" cy="98" rx="84" ry="90" fill="url(#mi-glass)" />

    {/* Outer frame — thick gold ring */}
    <ellipse cx="100" cy="98" rx="84" ry="90"
      fill="none" stroke="rgba(201,168,76,0.88)" strokeWidth="5" />

    {/* Inner frame ring */}
    <ellipse cx="100" cy="98" rx="78" ry="84"
      fill="none" stroke="rgba(201,168,76,0.22)" strokeWidth="1" />

    {/* Diamond ornaments at cardinal points */}
    <polygon points="100,4  105,9  100,14 95,9"   fill="rgba(201,168,76,0.85)" />
    <polygon points="100,182 105,187 100,192 95,187" fill="rgba(201,168,76,0.85)" />
    <polygon points="10,94  15,98  10,102 5,98"   fill="rgba(201,168,76,0.85)" />
    <polygon points="190,94 195,98 190,102 185,98" fill="rgba(201,168,76,0.85)" />

    {/* Small accent dots between diamonds */}
    <circle cx="38"  cy="26"  r="2" fill="rgba(201,168,76,0.45)" />
    <circle cx="162" cy="26"  r="2" fill="rgba(201,168,76,0.45)" />
    <circle cx="38"  cy="170" r="2" fill="rgba(201,168,76,0.45)" />
    <circle cx="162" cy="170" r="2" fill="rgba(201,168,76,0.45)" />

    {/* Shimmer highlights on glass */}
    <ellipse cx="67" cy="52" rx="11" ry="30"
      fill="rgba(255,255,255,0.065)" transform="rotate(-22 67 52)" />
    <ellipse cx="59" cy="57" rx="4"  ry="14"
      fill="rgba(255,255,255,0.04)"  transform="rotate(-22 59 57)" />
  </svg>
)

const scenarioSvg = (
  <svg viewBox="0 0 200 190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <marker id="sc-arr-gold" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(201,168,76,0.75)" />
      </marker>
      <marker id="sc-arr-red" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(239,68,68,0.5)" />
      </marker>
      <marker id="sc-arr-grey" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(255,255,255,0.22)" />
      </marker>
    </defs>

    {/* Situation box at top */}
    <rect x="55" y="8" width="90" height="30" rx="6"
      fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" />
    {/* Lines suggesting content (no text) */}
    <line x1="70" y1="18" x2="130" y2="18" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="70" y1="26" x2="118" y2="26" stroke="rgba(201,168,76,0.28)" strokeWidth="1"   strokeLinecap="round" />

    {/* Three branch lines from situation */}
    {/* Left — wrong path */}
    <line x1="78"  y1="38" x2="36"  y2="76"
      stroke="rgba(239,68,68,0.45)" strokeWidth="1.2" markerEnd="url(#sc-arr-red)" />
    {/* Center — optimal (gold, thicker) */}
    <line x1="100" y1="38" x2="100" y2="76"
      stroke="rgba(201,168,76,0.75)" strokeWidth="2"   markerEnd="url(#sc-arr-gold)" />
    {/* Right — neutral */}
    <line x1="122" y1="38" x2="164" y2="76"
      stroke="rgba(255,255,255,0.22)" strokeWidth="1"  markerEnd="url(#sc-arr-grey)" />

    {/* Option A — wrong (× mark) */}
    <circle cx="34"  cy="88" r="13"
      fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.48)" strokeWidth="1.3" />
    <line x1="27" y1="81" x2="41" y2="95" stroke="rgba(239,68,68,0.65)" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="41" y1="81" x2="27" y2="95" stroke="rgba(239,68,68,0.65)" strokeWidth="1.8" strokeLinecap="round" />

    {/* Option B — optimal (✓ mark, larger circle) */}
    <circle cx="100" cy="88" r="15"
      fill="rgba(201,168,76,0.14)" stroke="rgba(201,168,76,0.78)" strokeWidth="2" />
    <path d="M 91 88 L 97 95 L 112 80"
      fill="none" stroke="rgba(201,168,76,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Option C — neutral (– mark) */}
    <circle cx="166" cy="88" r="13"
      fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
    <line x1="158" y1="88" x2="174" y2="88"
      stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" />

    {/* Secondary outcome circles */}
    {/* From A */}
    <line x1="34" y1="101" x2="34" y2="126"
      stroke="rgba(239,68,68,0.25)" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="34" cy="134" r="8"
      fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.28)" strokeWidth="1" />
    <line x1="29" y1="129" x2="39" y2="139" stroke="rgba(239,68,68,0.4)" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="39" y1="129" x2="29" y2="139" stroke="rgba(239,68,68,0.4)" strokeWidth="1.2" strokeLinecap="round" />

    {/* From B */}
    <line x1="100" y1="103" x2="100" y2="126"
      stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" />
    <circle cx="100" cy="135" r="10"
      fill="rgba(201,168,76,0.16)" stroke="rgba(201,168,76,0.65)" strokeWidth="1.8" />
    <path d="M 93 135 L 98 141 L 109 127"
      fill="none" stroke="rgba(201,168,76,0.88)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* From C */}
    <line x1="166" y1="101" x2="166" y2="126"
      stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="166" cy="134" r="8"
      fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />

    {/* Convergence lines to debrief */}
    <path d="M 34 142 Q 67 162 88 160"
      stroke="rgba(201,168,76,0.22)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
    <line x1="100" y1="145" x2="100" y2="158"
      stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" />
    <path d="M 166 142 Q 133 162 112 160"
      stroke="rgba(201,168,76,0.22)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

    {/* Debrief box at bottom */}
    <rect x="68" y="158" width="64" height="26" rx="6"
      fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.45)" strokeWidth="1.3" />
    <line x1="80" y1="167" x2="120" y2="167" stroke="rgba(201,168,76,0.5)"  strokeWidth="1.3" strokeLinecap="round" />
    <line x1="80" y1="174" x2="110" y2="174" stroke="rgba(201,168,76,0.25)" strokeWidth="0.9" strokeLinecap="round" />
  </svg>
)

const MODULES = [
  {
    label: 'Trade Review',
    visual: chartSvg,
    desc: "A trading coach trained on your strategy reviews the student's real trades — identifies what broke the rules, what held up under pressure, and what pattern keeps repeating. The AI remembers every session, so it builds a case file on each trader over time.",
  },
  {
    label: 'The Mirror',
    visual: mirrorSvg,
    desc: "A psychology tool that draws on everything a student has said across sessions to surface patterns they couldn't see themselves — contradictions, recurring defenses, beliefs they keep circling. A reflection built entirely from their own words.",
  },
  {
    label: 'Live Objection Drill',
    visual: scenarioSvg,
    desc: "The AI plays a live prospect and throws real objections — price, timing, trust, competitor. The student has to handle them in real time. After the call, the AI debriefs every moment against your exact sales framework and scoring criteria.",
  },
]

const BULLETS = [
  "Every module runs on your content — the AI knows your curriculum specifically, not a generic approximation.",
  "Students engage through structured practice, not passive reading. The AI creates friction, asks hard questions, and refuses to let weak answers slide.",
  "Sessions compound: the AI tracks what each student struggled with and returns to it, making the next session harder and more precise than the last.",
  "Modules are custom-built for your subject matter — the Practice, Mirror, and Scenario are templates, not products. They are rebuilt around what you teach.",
  "The architecture is drawn from Sophego's Ego Mapper — seven practice modules designed to produce real change through repeated, AI-guided engagement. The same logic applies to any domain.",
  "Students leave with something that transfers to real situations — not just a better score on a quiz.",
]

export default function DepthSuite() {
  return (
    <section className="ds-section reveal">
      <div className="ds-inner">

        <div className="ds-header">
          <div className="ds-enterprise-badge">Enterprise only</div>
          <h2 className="ds-headline">The Depth Suite</h2>
          <p className="ds-subhead">
            Most AI tools answer questions. The Depth Suite makes students do the work.
            It is a category of structured exercises and practices — built on your content,
            powered by the best available AI — designed to help students actually exercise
            what they learned, not just review it.
          </p>
          <p className="ds-examples-note">
            The modules below are examples of what this looks like across three domains.
            Yours is built around what you teach.
          </p>
        </div>

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
