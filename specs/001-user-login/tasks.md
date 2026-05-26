---
description: "Task list for User Login test automation"
---

# Tasks: User Login

**Input**: Design documents from `specs/001-user-login/`

**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅

**Note**: This is a Playwright test automation project. The tests ARE the deliverable — there
are no separate "test tasks" for each implementation task. Every task either creates
infrastructure (page objects, fixtures) or adds test cases to `tests/login.spec.ts`.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)

---

## Phase 1: Setup

**Purpose**: Create the directory structure required by the plan.

- [ ] T001 Create directory structure: `tests/pages/` and `fixtures/` at repo root per `specs/001-user-login/plan.md §Project Structure`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core page objects and fixtures that ALL user stories depend on.

**⚠️ CRITICAL**: No user story tests can be written until this phase is complete.

- [ ] T002 [P] Create `fixtures/users.ts` — export `UserCredentials` interface and `users` constant with `standard`, `locked`, and `invalid` credential sets per `specs/001-user-login/data-model.md §UserCredentials`
- [ ] T003 [P] Create `tests/pages/LoginPage.ts` — implement `goto()`, `login(username, password)`, `errorMessage()`, `usernameField()`, `passwordField()`, `loginButton()` using `getByRole` locators per `specs/001-user-login/contracts/login-page.md`
- [ ] T004 [P] Create `tests/pages/InventoryPage.ts` — implement `isAt()` asserting URL contains `/inventory.html`, and `pageTitle()` returning `getByText('Products')` per `specs/001-user-login/contracts/login-page.md §InventoryPage`
- [ ] T005 Create `tests/login.spec.ts` — add `import` statements for `@playwright/test`, `LoginPage`, `InventoryPage`, and `users`; add top-level `describe('User Login', ...)` block; add `beforeEach` that instantiates `LoginPage` and `InventoryPage` and calls `loginPage.goto()`

**Checkpoint**: Foundation ready — user story tests can now be added to `tests/login.spec.ts`

---

## Phase 3: User Story 1 — Successful Login (Priority: P1) 🎯 MVP

**Goal**: Verified user can log in with valid credentials and land on the inventory page.

**Spec reference**: `specs/001-user-login/spec.md §US1 Acceptance Scenarios 1 & 2`

**Independent Test**: Run `npx playwright test --grep "US1"` after T006; expect 1 passing test.

### Implementation for User Story 1

- [ ] T006 [US1] Add test `[US1] successful login redirects to inventory page` to `tests/login.spec.ts` — call `loginPage.login(users.standard.username, users.standard.password)`; assert `page.url()` to contain `/inventory.html`; assert `inventoryPage.pageTitle()` to be visible; assert `inventoryPage.pageTitle()` to have text `Products`

**Checkpoint**: US1 fully functional and independently testable — run `npx playwright test --grep "US1"`

---

## Phase 4: User Story 2 — Locked Out User (Priority: P1)

**Goal**: Blocked user is denied access with a specific error message.

**Spec reference**: `specs/001-user-login/spec.md §US2 Acceptance Scenario 1`

**Independent Test**: Run `npx playwright test --grep "US2"` after T007; expect 1 passing test.

### Implementation for User Story 2

- [ ] T007 [US2] Add test `[US2] locked out user sees blocked error message` to `tests/login.spec.ts` — call `loginPage.login(users.locked.username, users.locked.password)`; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Sorry, this user has been locked out.`

**Checkpoint**: US2 fully functional and independently testable — run `npx playwright test --grep "US2"`

---

## Phase 5: User Story 3 — Invalid Credentials (Priority: P2)

**Goal**: Unrecognised credentials are rejected with the correct error text.

**Spec reference**: `specs/001-user-login/spec.md §US3 Acceptance Scenarios 1 & 2`

**Independent Test**: Run `npx playwright test --grep "US3"` after T009; expect 2 passing tests.

### Implementation for User Story 3

- [ ] T008 [US3] Add test `[US3] invalid credentials show error and URL stays on login page` to `tests/login.spec.ts` — call `loginPage.login(users.invalid.username, users.invalid.password)`; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Username and password do not match any user in this service`
- [ ] T009 [US3] Add test `[US3] non-existent user sees credential mismatch error text` to `tests/login.spec.ts` — call `loginPage.login('wrong_user', 'wrong_pass')`; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Username and password do not match any user in this service`

**Checkpoint**: US3 fully functional and independently testable — run `npx playwright test --grep "US3"`

---

## Phase 6: User Story 4 — Form Validation (Priority: P3)

**Goal**: Submitting empty or partial form shows accessible validation error messages.

**Spec reference**: `specs/001-user-login/spec.md §US4 Acceptance Scenarios 1, 2 & 3`

**Independent Test**: Run `npx playwright test --grep "US4"` after T012; expect 3 passing tests.

### Implementation for User Story 4

- [ ] T010 [US4] Add test `[US4] empty form submission shows username required error` to `tests/login.spec.ts` — click `loginPage.loginButton()` without filling any fields; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Username is required`
- [ ] T011 [US4] Add test `[US4] username only filled shows password required error` to `tests/login.spec.ts` — fill `loginPage.usernameField()` with `users.standard.username` only; click `loginPage.loginButton()`; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Password is required`
- [ ] T012 [US4] Add test `[US4] password only filled shows username required error` to `tests/login.spec.ts` — fill `loginPage.passwordField()` with `users.standard.password` only; click `loginPage.loginButton()`; assert `page.url()` to equal `https://www.saucedemo.com/`; assert `loginPage.errorMessage()` to be visible; assert `loginPage.errorMessage()` to have text `Epic sadface: Username is required`

**Checkpoint**: All 4 user stories complete — run `npx playwright test` to validate all 7 tests

---

## Phase 7: Polish & Validation

**Purpose**: TypeScript hygiene, full suite verification, and spec traceability review.

- [ ] T013 Run `npx tsc --noEmit` from repo root and fix any TypeScript errors in `tests/` and `fixtures/`
- [ ] T014 Run `npx playwright test` and confirm all 7 tests pass with zero failures
- [ ] T015 Review `tests/login.spec.ts` — confirm each test name includes its `[US#]` story label, mapping it to the corresponding acceptance criterion in `specs/001-user-login/spec.md` (constitution Principle IV)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: T002, T003, T004 can run in parallel; T005 depends on T002–T004
- **US1 (Phase 3)**: Depends on T005
- **US2 (Phase 4)**: Depends on T005; can start after US1 or in parallel with US1 (different test bodies)
- **US3 (Phase 5)**: Depends on T005
- **US4 (Phase 6)**: Depends on T005
- **Polish (Phase 7)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no cross-story dependency
- **US2 (P1)**: Can start after Foundational — no cross-story dependency
- **US3 (P2)**: Can start after Foundational — no cross-story dependency
- **US4 (P3)**: Can start after Foundational — no cross-story dependency

All user story phases (3–6) add tests to the same file (`tests/login.spec.ts`), so sequential
ordering within the file is enforced; implement in P1 → P1 → P2 → P3 order.

### Parallel Opportunities

```bash
# Phase 2: Run in parallel (different files)
Task T002: "Create fixtures/users.ts"
Task T003: "Create tests/pages/LoginPage.ts"
Task T004: "Create tests/pages/InventoryPage.ts"
# Then: T005 after all three complete
```

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (T002–T005)
3. Complete Phase 3: US1 test (T006)
4. **STOP and VALIDATE**: `npx playwright test --grep "US1"` → 1 test passes
5. `npx tsc --noEmit` → zero errors

### Incremental Delivery

1. Foundation → US1 test (1 test) — MVP
2. Add US2 test (2 tests total)
3. Add US3 tests (4 tests total)
4. Add US4 tests (7 tests total)
5. Polish phase — full suite green

---

## Notes

- T002, T003, T004 marked [P] — different files, no shared dependencies
- [US#] labels map each test task to its spec.md acceptance criterion
- Each story checkpoint validates independence before moving to the next
- `npx playwright test --grep "[US1]"` works because test names include the [US#] label
- T008 and T009 cover the same US3 scenario from two angles; they share the same error text
