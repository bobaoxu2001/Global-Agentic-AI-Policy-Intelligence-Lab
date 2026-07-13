# Phase 1 Test Report

**Date:** 2026-07-13

## Executed verification matrix

| Check | Expected result | Why |
|---|---|---|
| `npm run lint` | Passed | Source quality |
| `npm run typecheck` | Passed | Type correctness |
| `npm run test` | Passed: 27 tests | ADRS/schema/validation unit coverage |
| `npm run test:integration` | Passed: 25 tests | Dataset isolation and publication gate coverage |
| `npm run test:e2e` | Passed: 5 tests | Fixture demo UI flows |
| `npm run test:e2e:production` | Passed: 1 test | Production excludes fixture UI and renders the honest empty state |
| `npm run validate:fixtures` | Passed | Illustrative fixture corpus is internally valid |
| `npm run build:fixtures` | Passed: 32 static pages | Demo artifact builds |
| `npm run validate:production` | Failed with 26 R8 gate errors only | Expected: all real records remain `in_review` |
| `npm run build:production` | Not run | Prohibited until production validation passes |

## Gate interpretation

A failed production validation is a readiness signal, not a successful build. CI reports this separately and runs a production build only if the publication gate succeeds.
