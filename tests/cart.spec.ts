import { expect, test } from '../fixtures/pages';
import { products } from '../test-data/products';

test.beforeEach(async ({ loginAsStandardUser }) => {
  await loginAsStandardUser();
});

test('cart badge and cart contents stay in sync when adding and removing items', async ({
  inventoryPage,
  productPage,
  cartPage,
  header,
}) => {
  await test.step('add the backpack from the product list', async () => {
    await inventoryPage.addToCart(products.backpack);
    await expect(header.cartBadge).toHaveText('1');
  });

  await test.step('add the bike light from its product page', async () => {
    await inventoryPage.openProduct(products.bikeLight);
    // The URL changes before the product page renders; wait for an element only it has.
    await expect(productPage.backToProductsButton).toBeVisible();
    await expect(productPage.name).toHaveText(products.bikeLight);
    await productPage.addToCart();
    await expect(header.cartBadge).toHaveText('2');
  });

  await test.step('cart lists both items', async () => {
    await header.openCart();
    await expect(cartPage.itemNames).toHaveText([products.backpack, products.bikeLight]);
  });

  await test.step('remove the backpack from the cart', async () => {
    await cartPage.removeFromCart(products.backpack);
    await expect(header.cartBadge).toHaveText('1');
    await expect(cartPage.itemNames).toHaveText([products.bikeLight]);
  });
});
