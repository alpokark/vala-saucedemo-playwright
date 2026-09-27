# Test Design

## Approach

SauceDemo is a small web shop: log in, browse products, build a cart, check out. I picked the tests by asking "what failure would hurt a real shop most?" and covered each risk with one focused test that checks the outcome, not just that a page loaded.

## Features, risks and how each test validates them

| #   | Feature                  | Risk                                                            | How the test validates it                                                                                                                                                                                                 |
| --- | ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Checkout (happy path)    | Customers can't pay, or are charged the wrong amount            | Buys two products end to end. Prices are read from the product list, then checked on the overview: item prices match, subtotal = sum of prices, total = subtotal + tax. Ends on the confirmation page with an empty cart. |
| 2   | Login rejection          | Blocked or invalid users get in                                 | Locked-out user, wrong password and empty credentials (3 parameterized cases). Each must show its own error message and stay on the login page.                                                                           |
| 3   | Product sorting          | Catalogue shows wrong data or order                             | Sorts by "Price (low to high)" and checks the displayed prices are ascending. First confirms the default order isn't already ascending, so the test can't pass by accident.                                               |
| 4   | Cart state               | Badge and cart disagree, so the customer orders the wrong items | Adds one item from the product list and one from its product details page, then removes one in the cart. After each change the badge count is checked, and the cart must list exactly the expected items.                 |
| 5   | Checkout form validation | Orders are created with missing customer data                   | Leaves out one required field at a time (3 parameterized cases). Each must show its own error and block the step.                                                                                                         |
| 6   | Logout                   | Session stays valid after logout                                | Logs out, then opens `/inventory.html` directly. Access must be refused with the "log in first" error.                                                                                                                    |

Checkout and login carry the most weight because they guard money and access. Sorting and cart state cover the data the customer sees. Validation and logout cover the edges of the two main flows.

## Engineering choices

- **Real browser:** all tests drive Chromium, Firefox and WebKit through the UI. No API shortcuts.
- **No fixed sleeps:** only Playwright's auto-waiting and web-first assertions. SauceDemo is a single-page app whose URL changes before the next page renders, so tests wait for an element unique to the new page.
- **Locators:** `getByTestId` (the site's `data-test` attributes) and `getByRole` only. No CSS, XPath or position-based selectors.
- **Structure:** page objects hold every locator; specs describe behaviour only. Test data and expected messages live in `test-data/`. Prices are compared in integer cents to avoid rounding errors.
- **Enforcement:** ESLint fails the build on sleeps, `networkidle`, raw or positional locators, locators in specs, and un-awaited calls.

## Deliberately left out

- **SauceDemo's intentionally broken users** (`problem_user`, `error_user`, `visual_user`, `performance_glitch_user`). Unlike `locked_out_user`, whose rejection is correct behaviour and is covered by the login test, these users log in normally but then hit deliberate bugs, so tests run as them would fail by design. A natural next step is running the suite as `problem_user` to show it catches those bugs.
- **The other three sort options** (name A–Z and Z–A, price high to low). Price sorting is the one most likely to break, because sorting prices as text puts "$15.99" before "$7.99"; the name sorts are simple, and repeating near-identical cases would add little.
- **The exact tax rate.** It's an unstated business rule, so the test checks that the totals add up rather than hardcoding 8%.
- **Visual and accessibility checks.** Out of scope for 4–6 functional tests.
