# AI Usage

- To fit the recommended two hours, I used Claude Code as a pair programmer: Claude Sonnet 5 for the initial setup and Claude Opus 5.5 for most of the work.
- I set the rules first in CLAUDE.md (page objects, `getByTestId`/`getByRole` locators, no sleeps), required ESLint and type checking to pass before any task counts as done, checked the rules against the assignment's engineering requirements, and required Chromium + Firefox coverage.
- My initial five test scenarios came from my own analysis of the site, refined with an AI assistant.
- Claude reviewed the list and suggested changes (add a sorting test, verify logout really ends the session, calculate totals from the page); I agreed with the revised six.
- Claude wrote the page objects, test data and specs, configured ESLint to enforce my rules automatically, debugged failures against the live site, and checked stability by repeating the suite on three browsers.
- Claude drafted README.md and test_design.md.
- I manually reviewed all changes, questioned design choices (page objects, test data placement, test isolation), had the cart test simplified, and corrected unclear documentation.
- Before committing, I reviewed the suite for remaining gaps and asked Claude to cover them.
