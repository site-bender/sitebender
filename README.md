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
