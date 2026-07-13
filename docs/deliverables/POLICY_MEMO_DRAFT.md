# POLICY MEMO — WORKING DRAFT (Pass 1)

> **Draft status:** built on Pass-1 Atlas records that are `in_review` (Pass 2 pending, §19.4). It is not a current corpus inventory or publication-ready memo. The reconciled corpus is 17 sources, 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog records; see `docs/research/CORPUS_INVENTORY.md`. Finalize only after Pass 2 publishes the underlying records. Format target: ≤2 pages / ~900 words when typeset (SPEC §28).

---

**TO:** VP, Product & Policy (hypothetical reader)
**FROM:** AI Policy Atlas — independent research project
**DATE:** 2026-07-12 (as of)
**RE:** Human oversight and disclosure duties for action-taking AI agents: what four jurisdictions require, and what it means for deployment architecture

*Independent analysis; hypothetical deployment framing; not legal advice.*

---

## Bottom line up front

● The binding obligations that reach action-taking agents **today** concentrate on two points: telling people they are dealing with AI, and keeping a human meaningfully in control of consequential actions. ■ In the EU, the AI-disclosure duty (AI Act Art 50(1)) **held its 2026-08-02 date — three weeks out — while the high-risk timeline (including Art 14 human oversight) slid to end-2027** under the June omnibus [medium]. ▲ The architecture decision in front of any global agent program is therefore sequenced for you: ship the disclosure layer now for the EU and China (where labeling is already binding), and place the approval gate at the tool-execution boundary on your own schedule — but before end-2027 if any deployment can be classed high-risk [medium]. ● Recommendation: treat the gate as the global default anyway; every jurisdiction's trajectory converges on it, and retrofitting oversight into an autonomous execution path is the expensive order of operations.

## What is actually required today (■ facts, cited)

**EU.** The AI Act (Reg. (EU) 2024/1689; in force, applying in stages) requires high-risk systems to be "designed and developed in such a way … that they can be effectively overseen by natural persons during the period in which they are in use" (Art 14(1), verbatim verified) ■[high]. Art 50(1) requires systems interacting directly with people to inform them they face an AI system ■[high], applying from **2026-08-02** ■[medium]. GDPR Art 22 already gives persons the right not to be subject to solely automated consequential decisions ■[medium] — the "solely" is what a real human-in-the-loop removes ▲[medium].

**United States.** No federal statute reaches private agent operators; the EO 14110→14179 supersession (Tier-1 verified) reset federal posture toward removing perceived barriers, binding agencies rather than companies ■[high]. The action is at state level: Colorado's SB 24-205 was **repealed and reenacted before ever applying** — its successor SB 26-189 imposes disclosure-centered ADMT duties for consequential decisions from **2027-01-01** ■[medium].

**China.** The four-department Labeling Measures (国信办通字〔2025〕2号) have been **binding since 2025-09-01**: AI-generated content needs both explicit (user-perceptible) and implicit (file-metadata) labels — definitions verified verbatim in the Chinese authoritative text ■[medium, translation cap].

**Singapore.** No binding agent-specific statute; the Model AI Governance Framework for GenAI (IMDA/AI Verify Foundation, 2024-05-30, verified) is voluntary but market-expected ■[medium] — it shapes what regulators will ask, not what courts will order ▲[medium].

## What is coming (dated)

- **2026-08-02** — EU Art 50 disclosure applies (50(2) watermarking: 2026-12-02 for systems already on market) ■[medium]
- **2027-01-01** — Colorado ADMT developer duties ■[medium]
- **2027-12-02 / 2028-08-02** — EU high-risk obligations (Annex III / Annex I-embedded), post-omnibus; amending act pending OJ publication as of this draft ■[medium]

## Analysis (▲ inferences, medium)

The four regimes diverge in instrument choice — EU risk-tiered statute, US state-level disclosure statutes atop federal posture-by-executive-action, China binding content-governance rules, Singapore voluntary assurance — but converge on the same two control points: **disclosure at the human boundary** and **oversight at the action boundary**. Notably, when the EU trimmed its own timeline, it kept the disclosure duty and deferred the oversight one; Colorado's rewrite moved *toward* disclosure-first. Regulators are sequencing exactly the way an engineering team would: the cheap, observable control first. A single global architecture that (a) discloses AI interaction in-product, (b) labels synthetic output at render and file layers, and (c) gates effectful tool calls behind a logged human decision point satisfies the binding floor everywhere the Atlas tracks, with headroom for the 2027 dates.

## Recommendations (●)

1. **Ship the disclosure/labeling layer (control M8) now** — it is the only control with a binding, dated obligation inside 30 days (EU) and one already in force (CN).
2. **Adopt the approval-gate-at-tool-boundary (M1) + action-log (M3) pair as the global default** for agents at ADRS High or above, ahead of need — it is the convergence point of Art 14, Art 22, and every oversight regime queued for 2027.
3. **Set re-assessment triggers** (§19.5) on: EU omnibus OJ publication; 2026-08-02; 2027-01-01 — each flips at least one J component in current worksheets.

---
*Sources: Atlas records eu-ai-act, eu-gdpr, us-eo-14179/14110, us-co-sb24-205/sb26-189, cn-ai-labeling-measures, sg-mgf-genai (10 primary/official sources; verification log: docs/PHASE_1_RESEARCH_LOG.md). Confidence per SPEC §22; ■ fact / ▲ inference / ● recommendation per §20.*
