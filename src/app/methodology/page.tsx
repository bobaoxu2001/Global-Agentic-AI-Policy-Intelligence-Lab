export default function MethodologyPage() {
  return (
    <>
      <h1>Methodology</h1>
      <p className="status-note">Research records are source-traceable, epistemically typed, and published only after a documented human review. The present corpus remains in review.</p>
      <h2>ADRS constants (SPEC §13 — locked)</h2>
      <pre>{`Weights: A 0.25 · T 0.20 · D 0.20 · E 0.15 · R 0.20
Credits: M1 .10 M2 .08 M3 .07 M4 .06 M5 .05 M6 .04 M7 .04 M8 .03 M9 .03 (cap 0.40)
J: 1 + .10·binding + .05·near_term + .05·enforcement + .10·prohibition (cap 1.30)
Tiers (half-open, from RAW score): Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100]
Precision: full-precision chain; display rounds to 1 dp; tests assert ±0.001 (SPEC §13.7)`}</pre>
    </>
  );
}
