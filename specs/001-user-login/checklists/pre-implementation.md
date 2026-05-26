# Pre-Implementation Checklist: User Login

**Purpose**: Author self-review of spec and design quality before writing any test code.
Validates requirement completeness, clarity, consistency, and measurability across
`spec.md`, `data-model.md`, and `contracts/login-page.md`. Edge cases deferred.
**Created**: 2026-05-26
**Feature**: [spec.md](../spec.md) · [data-model.md](../data-model.md) · [contracts/login-page.md](../contracts/login-page.md)

---

## Spec: Requirement Completeness

- [ ] CHK001 - Are exact error message strings specified for all three US4 validation scenarios (both-empty, username-only, password-only), or only described vaguely as "validation messages appear"? [Completeness, Gap, Spec §US4]
- [ ] CHK002 - Is the exact login page URL (e.g., `https://www.saucedemo.com/`) specified for the URL assertion in US2 and US3, or only described as "URL stays on login page"? [Completeness, Spec §US2 §US3]
- [ ] CHK003 - Are requirements defined for what constitutes "no authenticated content is visible" in US2 acceptance scenario — is a specific absent element named? [Completeness, Spec §US2]
- [ ] CHK004 - Is each of the 7 test cases explicitly mapped to the triple-assertion requirement (URL + visible element + data value) defined in SC-002? [Completeness, Spec §SC-002]
- [ ] CHK005 - Are credential values for the username-only (US4 Scenario 2) and password-only (US4 Scenario 3) partial-fill scenarios sourced from `/fixtures/users.ts`, or are they expected to be inline values? [Completeness, Spec §US4]

---

## Spec: Requirement Clarity

- [ ] CHK006 - Is "validation messages appear for the required fields" in US4 Scenario 1 quantified with the exact message text, or is it too vague to write a deterministic assertion? [Clarity, Spec §US4 Scenario 1]
- [ ] CHK007 - Is "user-identifying element" in the US1 story description defined unambiguously? The acceptance scenario specifies `span with text "Products"`, which is a page title, not a user-specific element — are these the same requirement? [Clarity, Ambiguity, Spec §US1]
- [ ] CHK008 - Is the post-login URL assertion in US1 (`https://www.saucedemo.com/inventory.html`) specified as an exact match or a contains/pattern match? [Clarity, Spec §US1]
- [ ] CHK009 - Are the priority labels for US1 and US2 (both P1) intentional, given that a blocked user scenario is independent of the happy path? [Clarity, Spec §US1 §US2]

---

## Spec: Requirement Consistency

- [ ] CHK010 - Does the US1 story description ("user-identifying element, e.g., username or greeting") conflict with the acceptance scenario ("span with text 'Products'")?  If `Products` is the intended success assertion, the description should be updated to match. [Consistency, Conflict, Spec §US1]
- [ ] CHK011 - Is the entity named "DashboardPage" in `spec.md §Key Entities` the same as "InventoryPage" in `data-model.md` and `contracts/login-page.md`? If so, is the canonical name consistent across all documents? [Consistency, Conflict]
- [ ] CHK012 - Are the credential identifiers in the spec (`standard_user`, `locked_out_user`, `wrong_user`) consistent with the fixture keys in `data-model.md` (`users.standard`, `users.locked`, `users.invalid`)? [Consistency, Spec §Assumptions, data-model.md]
- [ ] CHK013 - Do FR-003 ("a user-identifying element MUST be visible") and the US1 acceptance scenario ("span with text 'Products' is visible") express the same requirement, or do they describe different assertions? [Consistency, Spec §FR-003 §US1]

---

## Spec: Acceptance Criteria Quality

- [ ] CHK014 - Can SC-001 ("all user stories have at least one passing automated test") be objectively verified given that the exact number of test cases (7) is only specified in `plan.md` and not in `spec.md`? [Measurability, Spec §SC-001]
- [ ] CHK015 - Is SC-003 ("no test uses a CSS selector or XPath — 100% semantic locator coverage") verifiable through a review process or tooling, and is that process documented? [Measurability, Spec §SC-003]
- [ ] CHK016 - Are the US4 acceptance criteria sufficient to produce deterministic test assertions, given that SauceDemo shows the error in an `<h3>` element and the spec does not specify the exact expected text? [Measurability, Gap, Spec §US4]

---

## Design: Data Model & Contract Completeness

- [ ] CHK017 - Does the `LoginPage` contract specify the behaviour of `login()` when called with empty-string arguments (as required by US4 Scenarios 1–3), or is this left implicit? [Completeness, contracts/login-page.md]
- [ ] CHK018 - Does the Error States table in `contracts/login-page.md` include all five error messages required by the spec (locked-out, invalid credentials, username required, password required)? [Completeness, contracts/login-page.md, Spec §US2 §US3 §US4]
- [ ] CHK019 - Is a `UserCredentials` record defined for partial-fill test scenarios (e.g., empty username + filled password), or are empty strings expected to be passed directly without a named fixture? [Completeness, data-model.md]

---

## Design: Contract Clarity

- [ ] CHK020 - Is `InventoryPage.isAt()` specified with a precise assertion strategy — does it assert `page.url()` contains `/inventory.html`, equals the full URL, or uses a different matcher? [Clarity, contracts/login-page.md]
- [ ] CHK021 - Is the `errorMessage()` locator (`getByRole('heading', { name: /Epic sadface/ })`) specific enough to uniquely identify a single element, given that multiple error states share the same container? [Clarity, contracts/login-page.md]
- [ ] CHK022 - Are the return types (`Promise<void>` vs `Locator`) for all `LoginPage` methods sufficient to describe the full post-call state, or do any action methods need to document navigation side-effects? [Clarity, contracts/login-page.md]

---

## Design: Cross-Document Consistency

- [ ] CHK023 - Are the locator strategies in `data-model.md` (e.g., `getByRole('textbox', { name: 'Username' })`) identical to those shown in `contracts/login-page.md`, with no silent divergence? [Consistency, data-model.md, contracts/login-page.md]
- [ ] CHK024 - Does the project structure in `plan.md` (`fixtures/users.ts`, `tests/pages/LoginPage.ts`, `tests/login.spec.ts`) align with all path references in `data-model.md`, `contracts/`, and `quickstart.md`? [Consistency, plan.md]
- [ ] CHK025 - Is the browser scope (Chromium only) documented consistently across `spec.md §Assumptions`, `plan.md §Technical Context`, and `playwright.config.ts`? [Consistency, Spec §Assumptions, plan.md]

---

## Notes

- Mark items `[x]` when verified; add inline finding if an issue is discovered.
- Items marked `[Gap]` require a spec or contract update before proceeding to `/speckit-tasks`.
- Items marked `[Conflict]` require one canonical version to be chosen and all documents updated.
- Items marked `[Ambiguity]` may proceed if the author accepts the current wording as sufficient.
