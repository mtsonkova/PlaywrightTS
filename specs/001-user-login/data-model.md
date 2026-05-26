# Data Model: User Login

**Feature**: `001-user-login` | **Date**: 2026-05-26

## Entities

### UserCredentials

Typed record representing a single user's login credentials.

| Field | Type | Description |
|-------|------|-------------|
| `username` | `string` | SauceDemo username |
| `password` | `string` | SauceDemo password |

**Validation rules**: Both fields required; no empty strings.

**Source**: `/fixtures/users.ts`

```typescript
export interface UserCredentials {
  username: string;
  password: string;
}

export const users: Record<string, UserCredentials> = {
  standard:  { username: 'standard_user',   password: 'secret_sauce' },
  locked:    { username: 'locked_out_user',  password: 'secret_sauce' },
  invalid:   { username: 'wrong_user',       password: 'wrong_pass'   },
};
```

---

### LoginPage (Page Object)

Represents the SauceDemo login page at `https://www.saucedemo.com`.

| Member | Kind | Description |
|--------|------|-------------|
| `goto()` | async method | Navigate to the login page (uses `baseURL`) |
| `login(username, password)` | async method | Fill credentials and click submit |
| `errorMessage()` | locator | `<h3>` inside the error container |
| `usernameField()` | locator | Username text input |
| `passwordField()` | locator | Password text input |
| `loginButton()` | locator | Submit button |

**Locator strategy** (all semantic, per constitution Principle I):

| Member | Playwright locator |
|--------|--------------------|
| `usernameField()` | `getByRole('textbox', { name: 'Username' })` |
| `passwordField()` | `getByRole('textbox', { name: 'Password' })` |
| `loginButton()` | `getByRole('button', { name: 'Login' })` |
| `errorMessage()` | `getByRole('heading', { name: /Epic sadface/ })` |

**State transitions**:
- Initial state: Login form visible, no error
- After `login()` with valid credentials → browser navigates to `/inventory.html`
- After `login()` with invalid/locked credentials → error heading appears, URL unchanged

---

### InventoryPage (Page Object)

Represents the SauceDemo inventory page at `https://www.saucedemo.com/inventory.html`.
Used only to assert successful post-login state.

| Member | Kind | Description |
|--------|------|-------------|
| `isAt()` | async method | Asserts URL ends with `/inventory.html` |
| `pageTitle()` | locator | "Products" title element |

**Locator strategy**:

| Member | Playwright locator |
|--------|--------------------|
| `pageTitle()` | `getByText('Products')` |
