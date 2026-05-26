# Contract: LoginPage

**Type**: Page Object interface contract
**File**: `tests/pages/LoginPage.ts`
**Date**: 2026-05-26

## Public Interface

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(page: Page);

  // Navigation
  goto(): Promise<void>;

  // Actions
  login(username: string, password: string): Promise<void>;

  // Locators (returned for assertion in test body)
  errorMessage(): Locator;   // getByRole('heading', { name: /Epic sadface/ })
  usernameField(): Locator;  // getByRole('textbox', { name: 'Username' })
  passwordField(): Locator;  // getByRole('textbox', { name: 'Password' })
  loginButton(): Locator;    // getByRole('button', { name: 'Login' })
}
```

## Behavioural Contract

| Method | Pre-condition | Post-condition |
|--------|--------------|----------------|
| `goto()` | Browser context active | Page is at `baseURL` (`/`); login form visible |
| `login(u, p)` | Page at login URL | Form filled and submitted; browser navigates or error appears |
| `errorMessage()` | — | Returns `Locator` for the error `<h3>`; caller asserts `.toBeVisible()` |
| `usernameField()` | — | Returns `Locator` for the username input |
| `passwordField()` | — | Returns `Locator` for the password input |
| `loginButton()` | — | Returns `Locator` for the submit button |

## Error States

| Condition | Visible error text |
|-----------|-------------------|
| Both fields empty | `Epic sadface: Username is required` |
| Username filled, password empty | `Epic sadface: Password is required` |
| Password filled, username empty | `Epic sadface: Username is required` |
| Locked-out user | `Epic sadface: Sorry, this user has been locked out.` |
| Invalid credentials | `Epic sadface: Username and password do not match any user in this service` |

## Contract: InventoryPage

**File**: `tests/pages/InventoryPage.ts`

```typescript
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(page: Page);

  isAt(): Promise<void>;    // asserts page.url() contains '/inventory.html'
  pageTitle(): Locator;     // getByText('Products')
}
```
