# Implementation Plan: User Login

**Branch**: `001-user-login` | **Date**: 2026-05-26 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-user-login/spec.md`

## Summary

Implement Playwright + TypeScript automated tests for the SauceDemo login flow covering
4 user stories: successful login (P1), locked-out user (P1), invalid credentials (P2),
and form validation (P3). Tests follow the Page Object Model with a typed credentials
fixture, targeting Chromium only. 7 test cases map 1-to-1 to spec acceptance scenarios.

## Technical Context

**Language/Version**: TypeScript (Node.js LTS)

**Primary Dependencies**: `@playwright/test ^1.60.0`, `@types/node ^25.9.1`

**Storage**: N/A

**Testing**: Playwright Test runner — `npx playwright test`

**Target Platform**: Chromium (Desktop Chrome) — SauceDemo at `https://www.saucedemo.com`

**Project Type**: E2E test automation suite

**Performance Goals**: Full suite completes in < 30 seconds locally

**Constraints**: Chromium only; semantic locators mandatory (getByRole/getByLabel/getByText);
triple assertion (URL + visible element + data value) per test case

**Scale/Scope**: 4 user stories, 7 test cases, 2 page objects, 1 fixture file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Notes |
|-----------|------|--------|-------|
| I. Semantic Locators | All locators MUST use getByRole / getByLabel / getByText | ✅ PASS | LoginPage uses getByRole('textbox'), getByRole('button'), getByRole('heading') |
| II. Triple Assertion | Every test asserts URL + visible element + data value | ✅ PASS | All 7 cases assert URL, a visible element, and a text/data value |
| III. Page Object Model | All interaction logic in `tests/pages/` | ✅ PASS | LoginPage.ts and InventoryPage.ts centralise all locators |
| IV. Spec Traceability | Each test maps to an acceptance criterion in spec.md | ✅ PASS | 7 tests ↔ 7 acceptance scenarios; spec path embedded in each test file |
| V. DRY & Clean Code | No copy-paste; conventional commits with test(scope): prefix | ✅ PASS | Credentials in `/fixtures/users.ts`; shared error assertion helper in LoginPage |

All gates pass. No complexity violations. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-user-login/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── login-page.md    # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
fixtures/
└── users.ts             # Typed credential constants

tests/
├── pages/
│   ├── LoginPage.ts     # Login page interactions and locators
│   └── InventoryPage.ts # Post-login inventory page assertions
└── login.spec.ts        # All 7 login test cases
```

**Structure Decision**: Single-project layout. `fixtures/` at repo root per constitution
Principle III. `tests/pages/` for all page objects. One spec file covers all 4 user
stories for cohesion; split into separate files only if count exceeds ~15 tests.
