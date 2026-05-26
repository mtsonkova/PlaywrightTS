# Feature Specification: User Login

**Feature Branch**: `001-user-login`

**Created**: 2026-05-26

**Status**: Draft

## Clarifications

### Session 2026-05-26

- Q: US4 Scenario 3 — should the validation message target the username field or the password field when only the password is filled in? → A: Username field (the empty field); consistent with SauceDemo behaviour ("Epic sadface: Username is required").
- Q: Where should test credentials be stored? → A: Fixtures file (`/fixtures/users.ts`) — typed TypeScript constants, no environment variable setup required.
- Q: Which browsers should the login tests run against? → A: Chromium only — sufficient for SauceDemo validation; cross-browser coverage deferred.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Login with Valid Credentials (Priority: P1)

A registered user navigates to the login page, enters valid credentials, and is
redirected to the authenticated dashboard/home page.

**Why this priority**: Core authentication flow — nothing else is testable without it.

**Independent Test**: Navigate to the login page, submit valid credentials, assert the
inventory page URL (`/inventory.html`) and the "Products" heading are visible.

**Acceptance Scenarios**:

1. **Given** a registered user is on the login page,
   **When** they enter a valid username standard_user and valid password secret_sauce and submit the form,
   **Then** they are redirected to url https://www.saucedemo.com/inventory.html and span with text "Products" is visible.


---
### User Story 2 - Login Failure with Blocked Credentials (Priority: P1)

A blocked user attempts to log in with an correct username and password and
receives a clear error message without being redirected.

**Why this priority**: Validates the blocked user revoced access — critical for security and UX.

**Independent Test**: Submit the login form with blocked credentials; assert the URL remains
on the login page and a visible error message is present.

**Acceptance Scenarios**:

1. **Given** a user with blocked credentials is on the login page,
   **When** they submit correct user name locked_out_user with correct password secret_sauce,
   **Then** an error message saying "Epic sadface: Sorry, this user has been locked out." is displayed, the URL stays on the login page, and no
   authenticated content is visible.

---

### User Story 3 - Login Failure with Invalid Credentials (Priority: P2)

A user attempts to log in with an incorrect password or unrecognised username and
receives a clear error message without being redirected.

**Why this priority**: Validates the rejection path — critical for security and UX.

**Independent Test**: Submit the login form with bad credentials; assert the URL remains
on the login page and a visible error message is present.

**Acceptance Scenarios**:

1. **Given** a user is on the login page,
   **When** they submit with valid username `standard_user` and wrong password `wrong_pass`,
   **Then** the error message "Epic sadface: Username and password do not match any user in this service" is displayed, the URL stays on the login page, and no authenticated content is visible.

2. **Given** a user is on the login page,
   **When** they submit with a nonexistent username `wrong_user` and password `wrong_pass`,
   **Then** the error message "Epic sadface: Username and password do not match any user in this service" is shown.

---

### User Story 4 - Login Form Validation (Priority: P3)

The login form prevents submission when required fields are empty and surfaces
accessible validation messages.

**Why this priority**: Supports accessibility and guards against trivially empty
submissions.

**Independent Test**: Attempt to submit an empty form; assert validation messages are
visible and the URL has not changed.

**Acceptance Scenarios**:

1. **Given** a user is on the login page,
   **When** they submit the form with both fields empty,
   **Then** the error message "Epic sadface: Username is required" is displayed and
   the form is not submitted.

2. **Given** a user is on the login page,
   **When** they submit with only the username "standard_user" filled in,
   **Then** the error message "Epic sadface: Password is required" is displayed.

3. **Given** a user is on the login page,
   **When** they submit with only the password "secret_sauce" filled in and leave the username field empty,
   **Then** the error message "Epic sadface: Username is required" is displayed.
---

### Edge Cases

- What happens when the user double-clicks the submit button?
- How does the system handle a session that is already active when the login page
  is visited (redirect to dashboard, or show login form)?
- What is shown if the authentication service is temporarily unavailable?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The login page MUST be accessible via a known URL.
- **FR-002**: The login form MUST contain a username/email field, a password field,
  and a submit button, each identifiable by a semantic role or accessible label.
- **FR-003**: On successful login, the user MUST be redirected to `/inventory.html`
  and the inventory page heading "Products" MUST be visible.
- **FR-004**: On failed login, an error message MUST be visible and the URL MUST
  remain on the login page.
- **FR-005**: Empty form submission MUST display at least one accessible validation
  message without navigating away from the login page.
- **FR-006**: All interactive elements MUST be reachable via semantic locators
  (`getByRole`, `getByLabel`, `getByText`).

### Key Entities

- **LoginPage**: The login page surface — URL, username field, password field,
  submit button, error message area, and validation message areas.
- **InventoryPage**: The post-login landing page at `/inventory.html` — URL pattern
  and the "Products" heading element.
- **TestCredentials**: Valid and invalid credential sets used across test scenarios.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All user stories have at least one passing automated test each.
- **SC-002**: Every test asserts a URL, a visible element, and a data value
  (per project triple-assertion standard).
- **SC-003**: No test uses a CSS selector or XPath — 100% semantic locator coverage.
- **SC-004**: All tests pass with zero TypeScript compilation errors.
- **SC-005**: Each test case maps to an acceptance scenario in this spec (full
  traceability).

## Assumptions

- A publicly accessible demo or staging application with a login page is available
  for test execution; the base URL will be configured in `playwright.config.ts`.
- Test credentials are stored in `/fixtures/users.ts` as typed TypeScript constants
  (not environment variables).
- The login page URL and post-login redirect URL are known before test implementation
  begins.
- Session persistence (remember-me, token refresh) is out of scope for this
  specification.
- Tests run on Chromium only; Firefox and WebKit are out of scope for this feature.