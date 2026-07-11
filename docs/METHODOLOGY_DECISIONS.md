# AI Policy Atlas — Methodology Decisions

**Purpose.** This document records design decisions that **materially affect how the Agent Deployment Risk Score (ADRS) is interpreted or computed**, and the epistemic/confidence rules that surround it. It is the reference a reviewer, interviewer, or auditor should read to understand *why* the numbers mean what they mean. It does not restate the full method (that is `SPEC.md` §12–13, §20–22); it captures the **judgment calls**.

**Status.** All entries below are settled and reflected in `SPEC.md`. Changing any of them requires editing `SPEC.md` first (they are `[LOCKED]` per ENGINEERING_HANDOFF §20). Created by the 2026-07-10 adversarial-review revision (`docs/REVISION_LOG.md`).

---

## MD-1 — Capability intensity is a 0–4 scale, distinct from the ADRS dimensions (CB-1)

**Decision.** Each capability an agent has is rated 0–4 for **intensity** (SPEC §10): 0 absent · 1 constrained/exceptional · 2 routine · 3 central · 4 broad/unconstrained/at-scale. This is a **separate axis** from the five ADRS dimensions A/T/D/E/R (§13.3).

**Why it matters for ADRS.** `binding_hit` — a J-multiplier component — fires when a binding, currently-applicable provision maps to a capability at **intensity ≥ 2**. Without a defined scale, `binding_hit` (and therefore J, and therefore the final score) was not reproducible. Intensity now makes `binding_hit` deterministic.

**Interpretation rules.** Intensity measures **degree/scope of use, not tool potency** (potency lives in dimension **T**). Between-anchor cases round **up** (risk-conservative). A capability gated behind human approval is still ≥1 (usually 2); the mitigation is credited separately (M-series), not by lowering intensity.

## MD-2 — Scenario capability intensities are assigned, not inferred (CB-1)

**Decision.** The three §14 scenarios now carry explicit per-capability intensities (Aria C1=2/C2=3/C3=3/C5=2/C6=3/C7=2/C9=2; Sentinel C2=3/C4=3/C5=3/C7=3/C10=2/C11=1; Mira C1=4/C3=3/C6=3/C9=3).

**Why it matters.** These values feed `binding_hit` per jurisdiction and are the fixture inputs the formula tests and scenario pages consume. They are **provisional pending Phase 1/2 research** (OD-12) but are treated as authored fixtures so the pipeline and tests are exercisable in Phase 0.

## MD-3 — Published J values are researched; §14 J values are illustrative (OD-11)

**Decision.** The J-component values (and therefore final scores) in SPEC §14 are **illustrative** and render only under `BUILD_PROFILE=fixtures`. A **production** assessment requires each J component to be justified against cited primary sources per §13.5.

**Why it matters.** The demo's headline claim — "Mira lands High in China and the EU for different reasons" — is a *methodology* demonstration in fixtures; the production site must not present illustrative J as researched fact. `enforcement_posture` and `prohibition_adjacent` readings are always typed **▲ inference**, never fact.

## MD-4 — The current assessment is the highest published version (OD-7)

**Decision.** `assessments` is append-only and versioned; the site renders, per scenario×jurisdiction, the **highest `version` whose `review_status='published'`**. Re-scores create new versions; history is retained.

**Why it matters.** ADRS is explicitly a moving judgment (re-scoring triggers, MD-10). "Which number is current" must be unambiguous and must never silently overwrite a prior published score.

## MD-5 — Rolled-up tier badges show the worst of four jurisdictions (OD-5)

**Decision.** Where a single tier badge summarizes a scenario across jurisdictions (home cards, scenario cards), it shows the **worst-of-four** tier with a "varies by jurisdiction" hint; the per-jurisdiction scores remain the authoritative detail.

**Why it matters.** A rolled-up badge must not imply one global score exists. Worst-of-four is the risk-conservative summary consistent with the product's governance framing.

## MD-6 — The "projected score with planned controls" view is deferred (MN-11)

**Decision.** The optional projected-score view (planned-but-unimplemented mitigations) is **out of MVP** (§13.6.4). Only **implemented** mitigations (with evidence) earn credit and appear in the score.

**Why it matters.** Prevents the calculator from presenting a speculative lower score alongside the real one — the exact "controls launder risk" failure the 0.40 cap exists to resist.

## MD-7 — Confidence is recorded at two distinct levels (OD-10)

**Decision.** `provisions.confidence` = confidence in the **extracted fact** (what the text says). `provision_capability_map.confidence` = confidence in the **scope inference** (that the provision reaches that capability). Both are displayed and labeled.

**Why it matters.** The mapping inference is usually weaker than the underlying fact; conflating them would overstate confidence in the provision→capability link that drives `binding_hit`.

## MD-8 — Half-open tiers, full precision, tier-from-raw (CB-2, CB-5)

**Decision.** Tiers are half-open intervals: **Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100]**. All computation is **full-precision with no intermediate rounding**; displayed values round to **one decimal place**; the **tier is derived from the unrounded score**; tests assert raw values within **±0.001** (SPEC §13.7).

**Why it matters.** ADRS is real-valued (e.g., Mira residual 49.9375). Without half-open intervals the boundaries were undefined; without a rounding rule the §14 examples were irreproducible and the calculator/build could disagree. A badge may legitimately read "50.0 · High" (raw 49.96 would read "49.96 · Moderate") — the number and the tier are independently derived from the same raw value.

## MD-9 — Mitigation credit is capped at 0.40 and cannot be evaded (unchanged; reaffirmed)

**Decision.** `MitigationCredit = min(0.40, Σ credits)`. Residual can never fall below 60% of inherent. The J multiplier (≤1.30) can only *raise* the score.

**Why it matters.** This is the core anti-gaming property: controls reduce likelihood, not the ceiling of inherent harm. Reaffirmed here because it is the single most interrogated design choice.

## MD-10 — `near_term_hit` is anchored to `assessed_date`, and assessments have re-scoring triggers (MN-13)

**Decision.** The 18-month "near-term" window for `near_term_hit` is measured from the assessment's **`assessed_date`**, not the build date. An assessment must be **re-scored (new version)** when a near-term provision becomes applicable or its window lapses, when an instrument feeding any J component changes status, or when the scenario's capability profile changes (SPEC §19.5).

**Why it matters.** J is time-sensitive; without an anchor date and re-scoring triggers, a published score could silently drift out of date — undermining the "policy moves; we correct in public" narrative.

## MD-11 — "Currently-applicable binding provision" is operationally defined; the compare matrix uses no intensity (MJ-2, MJ-3)

**Decision.** A provision is currently-applicable and binding iff: effective bindingness = `binding` (`provision.bindingness ?? instrument.bindingness`), instrument lifecycle ∈ {`fully_applicable`, `in_force_partially_applicable`}, and `applies_from` ≤ the reference date (assessment `assessed_date`, or build date for `/compare`). The `/compare` matrix counts such provisions **per capability/risk with no capability-intensity threshold** — the matrix describes jurisdictions, not an agent.

**Why it matters.** `binding_hit` and the compare counts were previously uncomputable ("currently applicable" undefined) and the compare view wrongly imported an agent-only "intensity ≥2" test.

## MD-12 — A/T/R are jurisdiction-invariant; only D/E may diverge, with justification (MJ-11)

**Decision.** For a scenario, dimensions **A, T, R must be identical** across its four jurisdiction assessments (they describe the system). **D and E may differ** only with a non-empty jurisdiction-specific `divergence_justification`. Enforced by integrity rule 13.

**Why it matters.** The cross-jurisdiction story must isolate *what actually varies by market* (regulatory exposure via J, and at most data/reach architecture via D/E) from *what cannot* (the system's autonomy, action surface, irreversibility). Divergent A/T/R across jurisdictions would be an analysis error.

---

*These twelve decisions, plus the locked formula constants (SPEC §13, ENG §9/§20), fully determine any ADRS number the Atlas publishes.*
