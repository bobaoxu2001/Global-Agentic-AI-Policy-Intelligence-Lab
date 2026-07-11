import { getPageDataset } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().provisions.map((p) => ({ id: p.id }));
}

/** Provision / Source Evidence shell — typed chain rendered flat in Phase 0 (3-pane reader is Phase 1). */
export default async function ProvisionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const ds = getPageDataset();
  const p = ds.provisions.find((x) => x.id === decoded);
  if (!p) return <p>Not found.</p>;
  const glyph = { fact: '■ Fact', inference: '▲ Inference', recommendation: '● Recommendation' } as const;
  return (
    <>
      <h1>{p.pin_cite}</h1>
      <p className="phase0">Phase 0 shell — typed Fact → Inference → Recommendation chain, unstyled.</p>
      {p.quote_verbatim ? <blockquote lang="en">{p.quote_verbatim}</blockquote> : null}
      <p>{p.paraphrase_en}</p>
      <p>confidence=<b>{p.confidence}</b> — {p.confidence_rationale}</p>
      <h2>Epistemic chain</h2>
      <ol>
        {p.epistemic_blocks.map((b) => (
          <li key={b.id}>
            <b>{glyph[b.kind]}</b>
            {b.kind !== 'recommendation' && b.confidence ? ` (confidence: ${b.confidence})` : ''} — {b.text_md}
            {b.citations?.map((c, i) => (
              <div key={i} style={{ fontSize: 12 }}>
                cite: {c.publisher} — {c.title}, {c.pin_cite} · Tier {c.tier} · accessed {c.accessed_date}
              </div>
            ))}
          </li>
        ))}
      </ol>
    </>
  );
}
