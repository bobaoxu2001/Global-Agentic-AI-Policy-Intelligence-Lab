# Golden 8 preview test report

Run on 2026-07-13 after the Golden 8 changes.

| Command | Result |
| --- | --- |
| `npm install` | Passed; dependencies reconciled. |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm run test` | Passed: 27 tests. |
| `npm run test:integration` | Passed: 26 tests. |
| `npm run test:e2e` | Passed: 5 fixture E2E tests. |
| `npm run test:e2e:preview` | Passed: preview browser result recorded by Playwright with no failed tests. |
| `npm run validate:fixtures` | Passed. |
| `npm run validate:preview` | Passed: 6 instruments, 2 provisions, 6 sources, 3 controls, 4 mappings. |
| `npm run build:fixtures` | Passed. |
| `npm run build:preview` | Passed; generated six instrument and two provision static paths. |
| `npm run validate:production` | Expected failure: 26 `R8-published-only` errors because all real corpus records remain `in_review`. |

The preview boundary tests cover manifest-only selection, no fixture leakage, exclusion of unrelated records and the excluded Colorado child provision, dependency resolution, persistent banner display, GDPR Article 22 evidence rendering, China Article 9 rendering, and the Singapore/Colorado caveats. Production rejection remains separately covered by existing integration tests and the production validator.
