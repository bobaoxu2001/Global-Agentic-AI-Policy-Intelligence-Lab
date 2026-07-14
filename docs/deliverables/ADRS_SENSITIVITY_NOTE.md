# ADRS Sensitivity and Calibration Note

**Purpose:** prevent false precision and define how the Agent Deployment Risk Score may and may not be used.

## Bottom line

ADRS is a **transparent prioritization heuristic**, not a calibrated probability, legal determination, compliance score, or automated launch gate. A displayed value such as `56.4` is useful for reproducing inputs and comparing scenarios under the same method; it does not mean the underlying policy or operational risk is known to one decimal place.

## Required decision rule

- Use the **tier, driver breakdown, and sensitivity range** together.
- Escalate when a plausible one-anchor or one-component change crosses a tier boundary.
- Never approve launch based on ADRS alone.
- Do not compare scores produced from materially different evidence quality without showing that difference.

## Illustrative sensitivity — Aria fixture

The Aria fixture uses dimensions `A=3, T=3, D=3, E=2, R=2`, mitigation classes `M2, M3, M4, M5, M8`, and illustrative jurisdiction components. These are fictional demo inputs.

| Test | What changes | Directional result | Decision meaning |
|---|---|---|---|
| Baseline | Stored fixture inputs | High in the more exposed fixture markets | Prioritize review; not a launch conclusion |
| Human approval gate | Add M1 credit with evidence | Can move the illustrative result down one tier | A control may be decision-relevant, but only if it is real, well placed, and evidenced |
| Autonomy uncertainty | Move A by one anchor | Material score change because A carries 25% weight | If autonomy classification is debatable, report a range and resolve the product fact |
| Jurisdiction uncertainty | Toggle one J component | Raises or lowers the final score without changing the system | The policy rationale must be cited; J is not a country reputation score |
| Mitigation failure | Remove one claimed mitigation | Residual risk increases | Credits require operating evidence; planned controls earn no credit |

## Calibration limits

1. Weights and credits are author-designed and have not been statistically calibrated against enforcement, incident, loss, or expert-judgment datasets.
2. Inputs contain structured judgment. Reproducibility does not eliminate uncertainty or bias.
3. The J multiplier is an exposure-communication device, not a measure of regulator severity or country risk.
4. Tier thresholds are decision bands, not empirically validated natural boundaries.
5. Missing policy coverage can bias a score downward; a sparse corpus is not evidence of low exposure.

## Minimum evidence to show with any score

- scenario and system version;
- assessment date and policy as-of date;
- dimension anchors with rationales;
- implemented mitigations with evidence;
- J components with cited facts or clearly labeled inference;
- sensitivity range for plausible disputed inputs;
- reviewer and review status;
- explicit statement that the score does not replace product, legal, security, or market review.
