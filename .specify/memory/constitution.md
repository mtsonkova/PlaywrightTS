<!-- SYNC IMPACT REPORT
Version change: TEMPLATE → 1.0.0
Initial constitution creation; no prior principles existed.

Added sections:
- Core Principles (5 principles)
- Tech Stack & Done Criteria
- Development Workflow
- Governance

Modified principles: N/A (initial version)
Removed sections: N/A (initial version)

Templates reviewed:
- .specify/templates/plan-template.md  ✅ No changes required — Constitution Check uses dynamic gates
- .specify/templates/spec-template.md  ✅ No changes required — structure is spec-traceability compatible
- .specify/templates/tasks-template.md ✅ No changes required — sample tasks are replaced at generation time

Follow-up TODOs: None
-->

# PlaywrightTS Constitution

## Core Principles

### I. Semantic Locators (NON-NEGOTIABLE)
Tests MUST use semantic locators: `getByRole`, `getByLabel`, `getByText`.
CSS selectors and XPath are FORBIDDEN unless no semantic alternative exists; any exception
MUST be documented inline with a justification comment explaining why no semantic locator
is available.

### II. Triple Assertion Requirement
Every test MUST assert at minimum three things: the page URL, at least one visible element,
and at least one data value. Tests asserting fewer than all three are considered incomplete
and MUST NOT be merged.

### III. Page Object Model
All page interaction logic MUST live in `tests/pages/`. Tests MUST NOT inline raw locators
or navigation sequences; direct Playwright API calls in test bodies are limited to
orchestration (navigate, assert). Shared fixtures live in `/fixtures`; reusable helpers
in `/utils`.

### IV. Spec Traceability (NON-NEGOTIABLE)
Every test file MUST trace to a spec in `.specify/specs/`. Each test case MUST correspond
to an acceptance criterion in the relevant spec. Orphaned tests (no matching spec criterion)
MUST NOT be merged.

### V. DRY & Clean Code
Test code MUST follow the DRY principle: no copy-pasted locators, selectors, or assertion
blocks. Code MUST be clean: meaningful names, single responsibility, no dead code. All
commits MUST follow conventional commits format with the `test(scope):` prefix for test
work.

## Tech Stack & Done Criteria

**Framework**: Playwright + TypeScript | **Package Manager**: npm | **Runtime typings**: `@types/node` | **Browser automation**: Playwright MCP server (`@playwright/mcp`) available for Claude Code to launch browsers, navigate pages, and inspect live DOM during test development

**Done is defined as ALL three of the following**:
- All Playwright tests pass: `npx playwright test`
- Zero TypeScript errors: `npx tsc --noEmit`
- Each test traces back to a spec acceptance criterion (Principle IV)

No feature is considered complete until all three done criteria are satisfied simultaneously.

## Development Workflow

Test authoring MUST follow this order:

1. Write or update the spec in `.specify/specs/` with acceptance criteria.
2. Implement page objects in `tests/pages/` for any new UI surfaces.
3. Write test cases asserting URL + visible element + data value (Principle II).
4. Run `npx playwright test` and `npx tsc --noEmit`; both MUST pass before committing.
5. Commit using `test(scope): description` conventional format.

Pull requests MUST reference the spec file they implement. Reviewers MUST verify compliance
with Principles I–V before approving.

## Governance

This constitution supersedes all other project practices and coding conventions. Conflicts
between team conventions and this constitution MUST be resolved in favor of the constitution
unless an amendment is ratified.

**Amendment procedure**:
1. Propose the change with rationale (why the current rule is insufficient or incorrect).
2. Update this file with a version bump (PATCH / MINOR / MAJOR per the versioning policy).
3. Update `LAST_AMENDED_DATE` to the amendment date.
4. Run the consistency propagation checklist against all dependent templates.
5. Commit with message: `docs: amend constitution to vX.Y.Z (summary of change)`.

**Versioning policy**: MAJOR for principle removal or redefinition; MINOR for a new principle
or section; PATCH for clarifications and wording fixes.

**Compliance**: All PRs MUST be reviewed against Principles I–V. The `/speckit-plan`
Constitution Check gate MUST be applied before Phase 0 research on every feature. Runtime
development guidance lives in `CLAUDE.md`.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26