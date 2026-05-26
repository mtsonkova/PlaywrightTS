<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-user-login/plan.md

## Project
- Name: PlaywrightTS
- Language: TypeScript
- Package Manager: npm
- Test Command: npx playwright test
- Test Directory: tests/
- Spec Directory: .specify/specs/

## Testing Standards
- Use semantic locators: getByRole, getByLabel, getByText
- Never use CSS selectors or XPath unless no alternative exists
- Every test must assert: a URL, a visible element, and a data value
- Page Object Model lives in tests/pages/
- Each spec in .specify/specs/ maps to a test file in tests/
- Use DRY principle
- Use clean code principle

## Done Criteria
- All Playwright tests pass (npx playwright test)
- No TypeScript errors (npx tsc --noEmit)
- Each test traces back to a spec acceptance criterion

## Test Automation Context
- Framework: Playwright + TypeScript
- Convention: use `test(scope):` prefix for test commits
- Fixtures live in /fixtures, helpers in /utils
- Follow conventional commits format
<!-- SPECKIT END -->
