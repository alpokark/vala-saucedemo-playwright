import { expect, test } from '../fixtures/pages';
import { sortOptions } from '../test-data/products';

test.beforeEach(async ({ loginAsStandardUser }) => {
  await loginAsStandardUser();
});

test('sorting by price low to high orders products by ascending price', async ({ inventoryPage }) => {
  const ascending = await test.step('read prices in the default order', async () => {
    const initialPrices = await inventoryPage.getPrices();
    const sorted = [...initialPrices].sort((a, b) => a - b);
    expect(initialPrices, 'default order must not already be ascending, or this test proves nothing').not.toEqual(
      sorted,
    );
    return sorted;
  });

  await test.step('sort by price, low to high', async () => {
    await inventoryPage.sortBy(sortOptions.priceLowToHigh);
    await expect(inventoryPage.activeSort).toHaveText(sortOptions.priceLowToHigh);
  });

  await test.step('products are listed in ascending price order', async () => {
    await expect.poll(() => inventoryPage.getPrices()).toEqual(ascending);
  });
});
