# @sitebender

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
