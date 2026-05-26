import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  pageTitle(): Locator {
    return this.page.getByText('Products');
  }
}
