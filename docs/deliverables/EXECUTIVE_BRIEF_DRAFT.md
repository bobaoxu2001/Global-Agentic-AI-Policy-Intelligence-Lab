# EXECUTIVE BRIEF — WORKING DRAFT (Pass 1)

> **Draft status:** ADRS figures are FIXTURE values (illustrative J pending Pass 2 / OD-11); underlying policy records are `in_review`. Finalize after Pass 2 publishes. Target: ≤1 page / ~350 words + one visual (SPEC §29). *Hypothetical scenario; independent analysis; not legal advice.*

---

## Should we ship the support agent ("Aria") in all four markets?

**● Answer: Yes — after two controls land: the AI-disclosure/labeling surface (K09) before EU/CN launch, and the refund approval gate (K01), which pulls all four markets from High to Moderate.**

### Scorecard (fixture worksheets, worst binding driver per market)

| Market | ADRS (fixture) | Tier | Top binding obligation today | Gating control |
|---|---|---|---|---|
| EU | 56.4 | **High** | ■ AI-disclosure duty applies **2026-08-02** (AI Act Art 50(1), text verified; date held through the omnibus) [medium] | K09 labeling surface |
| CN | 56.4 | **High** | ■ Conversational agents (智能对话) require conspicuous labels **since 2023** (深度合成规定 Art 17, verbatim verified) + 2025 dual marks [medium] | K09 labeling surface |
| US | 51.7 | **High** | ■ No federal statute reaches the operator; Colorado ADMT disclosure duties land **2027-01-01** (SB 26-189, bill page verified) [medium] | K12 profile doc now; K01 |
| SG | 51.7 | **High** | ■ No binding agent statute; MGF-GenAI (2024, verified) is voluntary but market-expected [medium] | K01 + K12 |

### What drives the score
- ▲ Autonomy 3 (refunds inside hard limits) × personal data incl. possible minors (D=3) keeps inherent risk at 66.25 in every market [fixture].
- ■ The binding floor is disclosure-shaped: CN has required it since 2023; the EU date arrives in three weeks; the US/SG floors are posture and 2027 dates [medium].
- ▲ J components, not system design, separate the markets — the agent is identical; exposure isn't [fixture].

### What changes the answer
- **Adding K01 (HITL gate, M1)** lifts mitigation credit to 0.39 → residual 40.4125 → **all four markets drop to Moderate**: EU/CN 48.5, US/SG 44.5 (half-open bands, tier from raw §13.7). One control moves the whole portfolio a tier — that is the ask.
- **2026-08-02** (EU Art 50) and **2027-01-01** (Colorado): each flips a J component; §19.5 re-assessment triggers are set on both.

**Ask:** approve K09 + K01 build now; re-score at OJ publication of the EU omnibus.

*Footer: as_of 2026-07-12 · records in_review · full worksheets: /scenarios/aria · methodology: /methodology*
