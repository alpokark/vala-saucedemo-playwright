import type { Locator, Page } from '@playwright/test';
import { toCents } from '../utils/price';

export class CheckoutOverviewPage {
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async getItemPrices(): Promise<number[]> {
    return (await this.itemPrices.allInnerTexts()).map(toCents);
  }

  async getSubtotal(): Promise<number> {
    return toCents(await this.subtotalLabel.innerText());
  }

  async getTax(): Promise<number> {
    return toCents(await this.taxLabel.innerText());
  }

  async getTotal(): Promise<number> {
    return toCents(await this.totalLabel.innerText());
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
