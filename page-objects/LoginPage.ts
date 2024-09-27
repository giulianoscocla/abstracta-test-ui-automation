import { type Locator, type Page } from '@playwright/test';
import { config } from '../config';

const { name } = config.existingUser;

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly loginUsername: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.loginUsername = page.locator("#loginusername");
    this.loginPassword = page.locator("#loginpassword");
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.welcomeMessage = page.getByText(`Welcome ${name}`);
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com');
  }

  async login(name: string, password: string) {
    await this.loginUsername.fill(name);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

}