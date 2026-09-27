import { expect, test } from '../fixtures/pages';
import { rejectedLoginCases } from '../test-data/login-cases';

for (const { name, credentials, error } of rejectedLoginCases) {
  test(`login is rejected for ${name} with an explanatory error`, async ({ loginPage, inventoryPage }) => {
    await test.step('submit the credentials', async () => {
      await loginPage.goto();
      await loginPage.login(credentials);
    });

    await test.step('error is shown and the user stays on the login page', async () => {
      await expect(loginPage.error).toHaveText(error);
      await expect(loginPage.loginButton).toBeVisible();
      await expect(inventoryPage.title).toBeHidden();
    });
  });
}
