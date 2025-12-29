import "./index.css";

const prioritizedExamples = [
  {
    title: "Repair roof flashing",
    severity: "High",
    contractorNeeded: true,
    costRange: "$800 - $1,200",
    summary: "Water intrusion risk at chimney; fix flashing and reseal joints.",
  },
  {
    title: "Reseal exterior windows",
    severity: "Medium",
    contractorNeeded: false,
    costRange: "$150 - $300",
    summary: "Drafts present; scrape, caulk, and repaint vulnerable sills.",
  },
];

function App() {
  return (
    <main className="app">
      <header>
        <p className="eyebrow">MVP: Inspection → prioritized projects</p>
        <h1>Home Improvement Planner</h1>
        <p className="lede">
          Upload an inspection report to instantly see prioritized project recommendations with cost
          ranges and contractor guidance.
        </p>
      </header>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Step 1</p>
            <h2>Upload inspection report</h2>
          </div>
          <p className="muted">Supported: PDF, JPEG, PNG (max 10 MB)</p>
        </div>
        <div className="uploader">
          <input type="file" aria-label="Upload inspection report" />
          <div className="uploader__cta">Drop a file here or choose from your device</div>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Step 2</p>
            <h2>Recommended projects (sample)</h2>
          </div>
          <p className="muted">Shows after parsing is complete</p>
        </div>
        <div className="card-grid">
          {prioritizedExamples.map((item) => (
            <article className="card" key={item.title}>
              <div className="card__header">
                <h3>{item.title}</h3>
                <span className={`pill pill--${item.severity.toLowerCase()}`}>{item.severity}</span>
              </div>
              <p className="muted">{item.summary}</p>
              <div className="meta">
                <span className="pill">{item.costRange}</span>
                <span className="pill pill--ghost">
                  {item.contractorNeeded ? "Contractor recommended" : "DIY-friendly"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
