import { expect, test } from '../fixtures/pages';
import { InventoryPage } from '../pages/InventoryPage';
import { messages } from '../test-data/messages';

test.beforeEach(async ({ loginAsStandardUser }) => {
  await loginAsStandardUser();
});

test('logging out ends the session so protected pages are no longer reachable', async ({
  header,
  loginPage,
  inventoryPage,
}) => {
  await test.step('log out from the side menu', async () => {
    await header.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  await test.step('opening the inventory directly is refused', async () => {
    await inventoryPage.goto();
    await expect(loginPage.error).toHaveText(messages.login.loginRequired(InventoryPage.path));
    await expect(inventoryPage.title).toBeHidden();
  });
});
