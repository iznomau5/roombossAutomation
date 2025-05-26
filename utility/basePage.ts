// tests/pages/BasePage.ts
import { Page } from '@playwright/test'

export abstract class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Common methods (optional)
  async goto(url: string) {
    await this.page.goto(url)
  }

  async getTitle(): Promise<string> {
    return this.page.title()
  }
}
