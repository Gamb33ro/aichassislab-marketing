export default function Problem() {
  return (
    <section className="problem-section">
      <div className="problem-inner">

        {/* Left: Editorial headline */}
        <div>
          <h2 className="problem-headline">
            ChatGPT gives everyone the same answer.
          </h2>
        </div>

        {/* Right: Three stacked blocks */}
        <div className="problem-blocks reveal">
          <div className="problem-block">
            <div className="problem-block-label">Generic Answers</div>
            <p className="problem-block-text">
              ChatGPT was trained on the internet. Your methodology wasn&apos;t on the
              internet. Your students need YOU, not an average of everyone.
            </p>
          </div>

          <div className="problem-divider" />

          <div className="problem-block">
            <div className="problem-block-label">Availability</div>
            <p className="problem-block-text">
              Your students have questions at 2am on a Sunday before their deadline.
              You don&apos;t. An AI trained on your content can answer exactly as you would.
            </p>
          </div>

          <div className="problem-divider" />

          <div className="problem-block">
            <div className="problem-block-label">Your Voice</div>
            <p className="problem-block-text">
              Generic AI gives generic advice. An AI trained specifically on your
              courses, your books, and your frameworks answers in your framework —
              not the internet&apos;s.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
