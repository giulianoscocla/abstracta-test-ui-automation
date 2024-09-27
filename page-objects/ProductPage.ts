import { Locator, Page } from '@playwright/test';

export type ProductInfo = {
  name: string;
  price: string;
  link: string;
};

export class ProductPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card');
    this.nextPageButton = page.locator('#next2');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com');
    await this.page.waitForLoadState('networkidle');
  }

  async getProductsInfo(): Promise<ProductInfo[]> {
    await this.page.waitForSelector('.card');
    
    const products = await this.productCards.evaluateAll((cards) => 
      cards.map((card) => {
        const nameElement = card.querySelector('.card-title a');
        const priceElement = card.querySelector('.card-block h5');
        return {
          name: nameElement ? nameElement.textContent?.trim() || '' : '',
          price: priceElement ? priceElement.textContent?.trim() || '' : '',
          link: nameElement ? nameElement.getAttribute('href') || '' : '',
        };
      })
    );

    return products.filter((product): product is ProductInfo => 
      product.name !== '' && product.price !== '' && product.link !== ''
    );
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    await this.page.waitForLoadState('networkidle');
    // Espera adicional para asegurar que los nuevos productos se carguen
    await this.page.waitForTimeout(1000);
  }

  async hasNextPage(): Promise<boolean> {
    return await this.nextPageButton.isVisible() && await this.nextPageButton.isEnabled();
  }
}