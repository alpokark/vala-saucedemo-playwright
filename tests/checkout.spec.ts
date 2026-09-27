import { expect, test } from '../fixtures/pages';
import { customer } from '../test-data/checkout';
import { messages } from '../test-data/messages';
import { products } from '../test-data/products';
import { sum } from '../utils/price';

test.beforeEach(async ({ loginAsStandardUser }) => {
  await loginAsStandardUser();
});

test('customer can buy two products and the order totals add up', async ({
  inventoryPage,
  header,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
}) => {
  const order = [products.backpack, products.bikeLight];

  const listedPrices = await test.step('add both products to the cart', async () => {
    const prices: number[] = [];
    for (const product of order) {
      prices.push(await inventoryPage.getPriceOf(product));
      await inventoryPage.addToCart(product);
    }
    await expect(header.cartBadge).toHaveText(String(order.length));
    return prices;
  });

  await test.step('start checkout from the cart', async () => {
    await header.openCart();
    await expect(cartPage.itemNames).toHaveText(order);
    await cartPage.checkout();
  });

  await test.step('enter customer information', async () => {
    await checkoutInformationPage.submit(customer);
  });

  await test.step('overview lists the products and the totals add up', async () => {
    await expect(checkoutOverviewPage.itemNames).toHaveText(order);
    expect(await checkoutOverviewPage.getItemPrices()).toEqual(listedPrices);

    const subtotal = await checkoutOverviewPage.getSubtotal();
    const tax = await checkoutOverviewPage.getTax();
    expect(subtotal).toBe(sum(listedPrices));
    expect(tax).toBeGreaterThan(0);
    expect(await checkoutOverviewPage.getTotal()).toBe(subtotal + tax);
  });

  await test.step('finish the order', async () => {
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.header).toHaveText(messages.checkout.orderComplete);
    await expect(header.cartBadge).toBeHidden();
  });
});
