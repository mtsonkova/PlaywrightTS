import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
  }

  errorMessage(): Locator {
    return this.page.getByRole('heading', { name: /Epic sadface/ });
  }

  usernameField(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  passwordField(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }
}
