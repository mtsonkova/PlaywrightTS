# Research: User Login

**Feature**: `001-user-login` | **Date**: 2026-05-26

## 1. SauceDemo DOM & Locator Strategy

### Decision
Use `getByRole` and `getByText` for all login page elements. No CSS selectors or XPath.

### Findings

SauceDemo (`https://www.saucedemo.com`) login page elements:

| Element | DOM | Recommended Locator |
|---------|-----|-------------------|
| Username input | `<input type="text" placeholder="Username" id="user-name">` | `getByRole('textbox', { name: 'Username' })` |
| Password input | `<input type="password" placeholder="Password" id="password">` | `getByRole('textbox', { name: 'Password' })` |
| Submit button | `<input type="submit" value="Login" id="login-button">` | `getByRole('button', { name: 'Login' })` |
| Error message | `<div data-test="error"><h3>Epic sadface: ...</h3></div>` | `getByRole('heading', { name: /Epic sadface/ })` |
| Products heading | `<span class="title">Products</span>` (post-login) | `getByText('Products')` |

**Rationale**: Playwright resolves `getByRole('textbox', { name: 'X' })` accessible name
from the `placeholder` attribute when no `aria-label` or `<label>` is present. This is
the correct accessible name computation per ARIA spec and passes the constitution's
semantic-locator requirement. Password `input[type="password"]` exposes role `textbox`
in Playwright's accessibility tree.

**Alternatives considered**:
- `getByPlaceholder('Username')` — valid Playwright locator but not in the constitution's
  explicit list. Rejected in favour of `getByRole`.
- `data-test` attribute selectors (`[data-test="username"]`) — CSS selector, FORBIDDEN.
- `locator('#user-name')` — CSS selector, FORBIDDEN.

## 2. SauceDemo Test Credentials

### Decision
Use the four well-known SauceDemo user accounts. Store in `/fixtures/users.ts`.

### Findings

| User | Username | Password | Behaviour |
|------|----------|----------|-----------|
| Standard | `standard_user` | `secret_sauce` | Successful login → `/inventory.html` |
| Locked out | `locked_out_user` | `secret_sauce` | Error: "Epic sadface: Sorry, this user has been locked out." |
| Invalid | `wrong_user` | `wrong_pass` | Error: "Epic sadface: Username and password do not match any user in this service" |

**Rationale**: SauceDemo is a public demo with fixed, documented credentials. Storing
them as typed constants in `/fixtures/users.ts` provides type safety and a single source
of truth per constitution Principle V (DRY).

## 3. Validation Error Messages

### Decision
Assert exact error message text using `getByRole('heading', { name: /.../ })`.

### Findings

SauceDemo error messages (exact text):

| Scenario | Error message |
|----------|--------------|
| Both fields empty | `Epic sadface: Username is required` |
| Username only, password empty | `Epic sadface: Password is required` |
| Password only, username empty | `Epic sadface: Username is required` |
| Locked out user | `Epic sadface: Sorry, this user has been locked out.` |
| Invalid credentials | `Epic sadface: Username and password do not match any user in this service` |

**Note**: SauceDemo renders validation errors in the same `<div data-test="error"><h3>`
container as authentication errors — there is no inline per-field validation. Tests
assert the error `<h3>` heading text.

**Rationale**: Exact text assertions satisfy the triple assertion "data value" requirement
(constitution Principle II) and make failures self-documenting.

## 4. Page Object Model Pattern (TypeScript)

### Decision
Class-based Page Objects with constructor injection of `Page`. Methods return `void`
or `Locator`; no chaining. `goto()` for navigation; action methods for interactions.

### Pattern

```typescript
export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() { await this.page.goto('/'); }
  async login(username: string, password: string) { /* fill + click */ }
  errorMessage() { return this.page.getByRole('heading', { name: /Epic sadface/ }); }
}
```

**Rationale**: Constructor injection allows easy instantiation in test `beforeEach`.
Returning `Locator` objects (not resolved values) keeps assertions in the test body,
preserving the triple-assertion pattern with clear test readability.

**Alternatives considered**:
- Fixture-based Page Objects (Playwright fixtures extending `test`) — more idiomatic for
  large suites but adds indirection for a 7-test suite. Deferred.
- Fluent/builder pattern — rejected for violating single-responsibility and DRY principles.

## 5. Test Isolation Strategy

### Decision
Each test navigates fresh via `page.goto('/')` in a `beforeEach` block. No shared state
between tests; Playwright's default per-test browser context provides isolation.

### Rationale
Playwright creates a new browser context per test by default (with `fullyParallel: true`),
so cookie/session state is already isolated. An explicit `goto('/')` in `beforeEach`
ensures a clean starting URL. No additional teardown needed for SauceDemo (stateless demo).
