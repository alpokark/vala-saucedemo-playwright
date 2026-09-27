# SauceDemo UI Tests

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com/), written with Playwright + TypeScript.

## Prerequisites

- Node.js 24 (pinned in [.nvmrc](.nvmrc); with nvm, run `nvm install && nvm use` in the project folder)
- Git
- Internet access (the tests run against the live site)

## Setup (clean environment)

```bash
git clone https://github.com/alpokark/vala-saucedemo-playwright.git
cd vala-saucedemo-playwright
npm ci
npx playwright install --with-deps
```

`npm ci` installs the exact dependency versions from `package-lock.json`. `npx playwright install --with-deps` downloads the browsers and, on Linux, the system libraries they need (this step may ask for `sudo`).

## Run

```bash
npm test
```

This runs the full suite headlessly against Chromium, Firefox, and WebKit (see [playwright.config.ts](playwright.config.ts)). The suite has 6 test scenarios. Two of them are parameterized (login: 3 cases, checkout validation: 3 cases), so each browser runs 10 test cases, 30 in total.

Chromium and Firefox are the required minimum browser coverage. To run just those two:

```bash
npm run test:min-browsers
```

To watch the tests in a visible browser window:

```bash
npm test -- --headed --project=chromium --workers=1
```

To step through tests interactively:

```bash
npx playwright test --ui
```

Other checks:

```bash
npm run lint
npm run typecheck
```

The HTML report is written to `playwright-report/` (open it with `npx playwright show-report`).

## What's covered

| Spec                          | Behaviour                                                                                                         | Risk it guards                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `checkout.spec.ts`            | Buy two products end to end; item prices, subtotal, tax and total add up                                          | Revenue path, price calculation errors |
| `login.spec.ts`               | Locked-out user, wrong password and empty credentials are rejected with the right error                           | Unauthorised access                    |
| `inventory-sorting.spec.ts`   | "Price (low to high)" really orders products by price                                                             | Broken catalogue data handling         |
| `cart.spec.ts`                | Badge and cart contents stay in sync when adding from the product list and product page, and removing in the cart | Cart state drifting from what's shown  |
| `checkout-validation.spec.ts` | Each required checkout field blocks submission with its own error                                                 | Orders with missing customer data      |
| `logout.spec.ts`              | Logout ends the session; protected pages redirect to login                                                        | Session not invalidated                |

## Structure

```
pages/        Page objects: every locator lives here
fixtures/     Playwright fixtures that inject page objects and a login helper
test-data/    Users, products, messages and parameterized cases
utils/        Price parsing
tests/        Specs: behaviour only, no locators
```

## Further reading

- [test_design.md](test_design.md): which features and risks the suite focuses on, and why
- [ai_usage.md](ai_usage.md): how AI tools were used
- [CLAUDE.md](CLAUDE.md): engineering rules and conventions (also read by Claude Code)
