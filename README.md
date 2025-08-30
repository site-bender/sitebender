# @sitebender

[![CI](https://github.com/site-bender/sitebender/actions/workflows/ci.yml/badge.svg?branch=phase-2)](https://github.com/site-bender/sitebender/actions/workflows/ci.yml)

![Header](./github-sitebender-banner.png)

Notes:

- Accessibility
- Inclusivity
- Transparency
- Collaboration
- Community
- Empowerment
- Security
- Usability
- Universal design
- Performance
- Privacy
- Data protection
- Offline access

## Development quick start

Documentation site:

- Build once and serve:
	- deno task --cwd docs start
- Watch + dev server:
	- deno task --cwd docs dev

End-to-end (Playwright):

- Install browsers once:
	- npx playwright install --with-deps
- Run tests:
	- deno task --cwd docs test:e2e

Hydration bundle summary:

- Client entry: `docs/src/hydrate/adaptive.ts`
- Bundle step: `scripts/build/bundleHydrate/index.ts` (Deno emit)
- Output: `docs/dist/scripts/hydrate/adaptive.js`
- Referenced by: `docs/src/routes/tutorial/index.tsx`

## Contributing

- Local fast loop:
	- Lint: `deno task lint`
	- Tests (non-strict): `deno task test:adaptive`, `deno task test:components`, `deno task test:toolkit`
- Pre-push / CI parity (strict):
	- Type-check: `deno task type-check`
	- Alias guard: `deno task lint:aliases`
	- Tests (strict): `deno task test:adaptive:strict`, `deno task test:components:strict`, `deno task test:toolkit:strict`

CI runs strict tasks and will block on lint, type-check, alias guard, and strict tests. Use fast tasks for quick local iteration, then verify with strict before PRs.

## Prime Command: Clean-as-you-go

- Fix small issues immediately while you’re in the file.
- Keep changes small; re-run fmt/lint/type-check and relevant strict tests after each meaningful edit.
- If a fix is too big for now, leave a visible note and make it the next task—don’t let it drift.
- Hold the line: no net-new errors, keep tests green.

## Authoring canon: Events and Actions

- Events: prefer `When.*` (aliases map to `On.*`).
	- `When.Clicked` ≡ `On.Click`
	- `When.Submitted` ≡ `On.Submit`
	- `When.ValueUpdated` ≡ `On.Input`
	- `When.ChangeComplete` ≡ `On.Change`
	- `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
	- `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)
- Actions: author as bare verbs (no `Do.*` in docs/examples).
