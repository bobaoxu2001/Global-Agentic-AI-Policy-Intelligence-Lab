# Policy Memo — Superseded Working Draft (Pass 1)

> **Superseded:** retained as research history. Use [POLICY_MEMO_HUMAN_OVERSIGHT_AND_DISCLOSURE.md](POLICY_MEMO_HUMAN_OVERSIGHT_AND_DISCLOSURE.md) for the final portfolio writing sample. This file is not the current hiring-manager deliverable.

> **Draft status:** built on Pass-1 Atlas records that are `in_review` (Pass 2 pending, §19.4). It is not a current corpus inventory or publication-ready memo. The reconciled corpus is 17 sources, 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog records; see `docs/research/CORPUS_INVENTORY.md`. Finalize only after Pass 2 publishes the underlying records. Format target: ≤2 pages / ~900 words when typeset (SPEC §28).

---

**TO:** VP, Product & Policy (hypothetical reader)
**FROM:** AI Policy Atlas — independent research project
**DATE:** 2026-07-12 (as of)
**RE:** Human oversight and disclosure duties for action-taking AI agents: what four jurisdictions require, and what it means for deployment architecture

*Independent analysis; hypothetical deployment framing; not legal advice.*

---

## Bottom line up front

● This limited sample supports two recurring control priorities for action-taking agents: tell people when they are interacting with AI, and preserve meaningful control over consequential actions. ■ In the EU, Article 50 transparency obligations retain a 2026-08-02 application date while the high-risk timeline moved later under the June omnibus [medium]. ▲ The architecture implication is to build disclosure, scoped authority, approval, logging, and redress as reusable capabilities while qualified reviewers determine which duties apply to each product-market configuration. ● Recommendation: approve reversible control work now; do not infer that the sample establishes a universal legal floor or authorizes launch.

## What is actually required today (■ facts, cited)

**EU.** The AI Act (Reg. (EU) 2024/1689; in force, applying in stages) requires high-risk systems to be "designed and developed in such a way … that they can be effectively overseen by natural persons during the period in which they are in use" (Art 14(1), verbatim verified) ■[high]. Art 50(1) requires systems interacting directly with people to inform them they face an AI system ■[high], applying from **2026-08-02** ■[medium]. GDPR Art 22 already gives persons the right not to be subject to solely automated consequential decisions ■[medium]. Meaningful human review with authority may take a process outside “solely automated”; nominal review may not ▲[medium].

**United States.** The scoped corpus identifies no comprehensive federal AI-specific statute governing private agent operators; that is not a conclusion about sectoral, state, consumer-protection, privacy, civil-rights, or other generally applicable law. The EO 14110→14179 sequence changes federal executive posture and primarily directs agencies ■[high]. The sample also tracks Colorado's evolving ADMT framework, including SB 26-189 duties scheduled from **2027-01-01** ■[medium].

**China.** The four-department Labeling Measures (国信办通字〔2025〕2号) have been **binding since 2025-09-01**. Covered service providers must add implicit labels and, in the circumstances specified by the Measures, explicit user-perceptible labels; scope, conditions, and exceptions remain product-specific ■[medium, translation cap].

**Singapore.** The current scoped sample includes voluntary AI governance frameworks but is insufficient to conclude that no binding law applies to a particular agent. The Model AI Governance Framework for GenAI (2024) and the Model AI Governance Framework for Agentic AI (2026) are non-binding governance signals; applicable data, consumer, sectoral, and other law still requires product-specific review.

## What is coming (dated)

- **2026-08-02** — EU Art 50 disclosure applies (50(2) watermarking: 2026-12-02 for systems already on market) ■[medium]
- **2027-01-01** — Colorado ADMT developer duties ■[medium]
- **2027-12-02 / 2028-08-02** — EU high-risk obligations (Annex III / Annex I-embedded), post-omnibus; amending act pending OJ publication as of this draft ■[medium]

## Analysis (▲ inferences, medium)

The sampled regimes use different instruments, but repeatedly surface two engineering control points: **disclosure at the human boundary** and **oversight at the action boundary**. This supports a reusable architecture that discloses AI interaction, labels covered synthetic output, scopes tool authority, and logs meaningful approval for high-impact actions. It does **not** establish that one architecture satisfies every applicable duty; coverage is incomplete and product facts, sectors, and local law can change the result.

## Recommendations (●)

1. **Build and test the disclosure/labeling layer (control M8) now** — then validate its application and implementation for each market before launch.
2. **Adopt the approval-gate-at-tool-boundary (M1) + action-log (M3) pair as the global default** for agents at ADRS High or above, ahead of need — this aligns with recurring oversight themes in the sampled instruments without claiming that the pair alone satisfies each applicable duty.
3. **Set re-assessment triggers** (§19.5) on: EU omnibus OJ publication; 2026-08-02; 2027-01-01 — each flips at least one J component in current worksheets.

---
*Sources: Atlas records eu-ai-act, eu-gdpr, us-eo-14179/14110, us-co-sb24-205/sb26-189, cn-ai-labeling-measures, sg-mgf-genai (10 primary/official sources; verification log: docs/PHASE_1_RESEARCH_LOG.md). Confidence per SPEC §22; ■ fact / ▲ inference / ● recommendation per §20.*
