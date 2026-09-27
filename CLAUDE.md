# Project: SauceDemo UI tests (Playwright + TS)

## Rules

- Tests drive a real browser end-to-end (Playwright). No API-only specs — UI flows must go through the browser.
- All UI interaction goes through page objects in `/pages`. Specs contain no locators.
- Locators: `getByTestId` (data-test) or `getByRole`. No CSS/XPath, no `.nth()` unless unavoidable.
- No `waitForTimeout`, no `networkidle`. Web-first assertions only.
- Every Playwright call is awaited.
- One behaviour per test, descriptive test names, `test.step` for readability.
- Test data in `/test-data`, no hardcoded strings in specs.

## Commands

- `npm test` / `npm run lint` / `npm run typecheck`
- Run lint + typecheck + `npm run format:check` + tests before declaring a task done (`npm run format` fixes formatting).

## Structure

- `pages/` page objects (all locators live here), `fixtures/pages.ts` injects them into tests
  and provides `loginAsStandardUser`.
- `test-data/` users, products, messages, parameterized cases. `utils/price.ts` parses prices to cents.
- ESLint enforces the rules above (no sleeps, no networkidle, no raw/nth locators, no locators in
  specs, no floating promises).

## SauceDemo gotchas

- `getByTestId` maps to `data-test` (set in `playwright.config.ts`).
- Product names, menu items (e.g. Logout) and the cart icon are exposed as buttons, not links.
- It's an SPA: the URL changes before the next page renders. Before interacting with a new page,
  wait for an element unique to it (e.g. "Back to products" on product details).
