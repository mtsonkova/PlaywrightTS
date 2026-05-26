# Quickstart: User Login Tests

**Feature**: `001-user-login` | **Date**: 2026-05-26

## Prerequisites

- Node.js LTS installed
- `npm install` run from project root
- Playwright browsers installed: `npx playwright install chromium`

## Run Tests

```bash
# All login tests
npx playwright test tests/login.spec.ts

# Full suite
npx playwright test

# TypeScript check only (no browser)
npx tsc --noEmit
```

## Expected Output

```
Running 7 tests using 7 workers

  ✓ [US1] successful login redirects to inventory page
  ✓ [US2] locked out user sees blocked error message
  ✓ [US3] invalid credentials shows error message
  ✓ [US3] non-existent user sees credential mismatch error
  ✓ [US4] empty form shows username required error
  ✓ [US4] username only shows password required error
  ✓ [US4] password only shows username required error

  7 passed (Xs)
```

## Project Structure

```text
fixtures/
└── users.ts           # Credential constants — edit here to update test users

tests/
├── pages/
│   ├── LoginPage.ts   # Login page object — locators and actions
│   └── InventoryPage.ts  # Inventory page object — post-login assertions
└── login.spec.ts      # Test cases — maps 1-to-1 to spec.md acceptance criteria

playwright.config.ts   # baseURL, browser projects, trace config
```

## View HTML Report

After a test run:

```bash
npx playwright show-report
```

## Trace Viewer (on failure)

Traces are collected on first retry. To view:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```
