import { expect, test } from '../fixtures/pages';
import { missingFieldCases } from '../test-data/checkout';
import { products } from '../test-data/products';

test.beforeEach(async ({ loginAsStandardUser, inventoryPage, header, cartPage }) => {
  await loginAsStandardUser();
  await inventoryPage.addToCart(products.backpack);
  await header.openCart();
  await cartPage.checkout();
});

for (const { field, info, error } of missingFieldCases) {
  test(`checkout cannot continue without ${field}`, async ({ checkoutInformationPage, checkoutOverviewPage }) => {
    await test.step(`submit the form without ${field}`, async () => {
      await checkoutInformationPage.submit(info);
    });

    await test.step('error is shown and the user stays on the form', async () => {
      await expect(checkoutInformationPage.error).toHaveText(error);
      await expect(checkoutInformationPage.continueButton).toBeVisible();
      await expect(checkoutOverviewPage.finishButton).toBeHidden();
    });
  });
}
