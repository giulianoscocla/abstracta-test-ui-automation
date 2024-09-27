import { type Locator, type Page } from '@playwright/test';
import { config } from '../config';

export class RegisterPage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly registerUsername: Locator;
  readonly registerPassword: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Sign up' });
    this.registerUsername = page.getByLabel('Username:');
    this.registerPassword = page.getByLabel('Password:');
    this.registerButton = page.getByRole('button', { name: 'Sign up' })
  }

  async goto() {
    await this.page.goto(config.baseUrl);
  }

  async register(name: string, password: string) {
    await this.registerUsername.fill(name);
    await this.registerPassword.fill(password);
    await this.registerButton.click();
  }

}