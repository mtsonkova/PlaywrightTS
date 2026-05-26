import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { users } from '../fixtures/users';

test.describe('User Login', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  // US1 — Successful Login (spec.md §US1 Acceptance Scenarios 1 & 2)
  test('[US1] successful login redirects to inventory page', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(inventoryPage.pageTitle()).toBeVisible();
    await expect(inventoryPage.pageTitle()).toHaveText('Products');
  });

  // US2 — Locked Out User (spec.md §US2 Acceptance Scenario 1)
  test('[US2] locked out user sees blocked error message', async ({ page }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  // US3 — Invalid Credentials (spec.md §US3 Acceptance Scenarios 1 & 2)
  test('[US3] valid username with wrong password shows credential mismatch error', async ({ page }) => {
    await loginPage.login(users.standard.username, 'wrong_pass');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('[US3] nonexistent username shows credential mismatch error', async ({ page }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // US4 — Form Validation (spec.md §US4 Acceptance Scenarios 1, 2 & 3)
  test('[US4] empty form submission shows username required error', async ({ page }) => {
    await loginPage.loginButton().click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText('Epic sadface: Username is required');
  });

  test('[US4] username only filled shows password required error', async ({ page }) => {
    await loginPage.usernameField().fill(users.standard.username);
    await loginPage.loginButton().click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText('Epic sadface: Password is required');
  });

  test('[US4] password only filled shows username required error', async ({ page }) => {
    await loginPage.passwordField().fill(users.standard.password);
    await loginPage.loginButton().click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage()).toBeVisible();
    await expect(loginPage.errorMessage()).toHaveText('Epic sadface: Username is required');
  });
});
