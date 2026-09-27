import type { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly backToProductsButton: Locator;
  readonly name: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
    this.name = page.getByTestId('inventory-item-name');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
