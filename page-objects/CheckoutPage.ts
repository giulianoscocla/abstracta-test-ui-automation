import { type Locator, type Page } from '@playwright/test';

export type checkoutDetails = {
  name: string,
  country: string,
  city: string,
  card: string,
  month: string,
  year: string
}

export class CheckoutPage {
  readonly page: Page;
  readonly toBuyProduct: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly placeOrderButton: Locator;
  readonly purchaseButton: Locator;
  readonly formName: Locator;
  readonly formCountry: Locator;
  readonly formCity: Locator;
  readonly formCard: Locator;
  readonly formMonth: Locator;
  readonly formYear: Locator;
  readonly thanksMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toBuyProduct = page.getByRole("link", { name: "Samsung galaxy s6" });
    this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
    this.purchaseButton = page.getByRole("button", { name: "Purchase" });
    this.formName = page.locator("#name");
    this.formCountry = page.locator("#country");
    this.formCity = page.locator("#city");
    this.formCard = page.locator("#card");
    this.formMonth = page.locator("#month");
    this.formYear = page.locator("#year");
    this.thanksMessage = page.getByText("Thank you for your purchase!");
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com');
  }
  
  async fillCheckoutDetails(userData: checkoutDetails){
    await this.formName.waitFor({ state: 'visible' });
    await this.formName.fill(userData.name);
    await this.formCountry.waitFor({ state: 'visible' });
    await this.formCountry.fill(userData.country);
    await this.formCity.waitFor({ state: 'visible' });
    await this.formCity.fill(userData.city);
    await this.formCard.waitFor({ state: 'visible' });
    await this.formCard.fill(userData.card);
    await this.formMonth.waitFor({ state: 'visible' });
    await this.formMonth.fill(userData.month);
    await this.formYear.fill(userData.year);
  }

}