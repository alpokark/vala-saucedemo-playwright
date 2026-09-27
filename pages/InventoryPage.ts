import { expect, type Locator, type Page } from '@playwright/test';
import { toCents } from '../utils/price';

export class InventoryPage {
  static readonly path = '/inventory.html';

  readonly title: Locator;
  readonly items: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly activeSort: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.activeSort = page.getByTestId('active-option');
  }

  item(name: string): Locator {
    return this.items.filter({
      has: this.page.getByRole('button', { name: `View details for ${name}`, exact: true }),
    });
  }

  async goto(): Promise<void> {
    await this.page.goto(InventoryPage.path);
  }

  async addToCart(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openProduct(name: string): Promise<void> {
    await this.item(name).getByTestId('inventory-item-name').click();
  }

  async sortBy(label: string): Promise<void> {
    await this.sortSelect.selectOption({ label });
  }

  async getPriceOf(name: string): Promise<number> {
    return toCents(await this.item(name).getByTestId('inventory-item-price').innerText());
  }

  async getPrices(): Promise<number[]> {
    await expect(this.itemPrices).not.toHaveCount(0);
    return (await this.itemPrices.allInnerTexts()).map(toCents);
  }
}
