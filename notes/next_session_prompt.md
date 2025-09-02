# Next Session Prompt — Sitebender (phase-2)

Use this file as your prompt to resume exactly where we left off.

## What’s done
- Inline authoring via Program is live on docs pages.
  - Tutorial: `docs/src/routes/tutorial/index.tsx` uses `<Program>`, `<On>`, `<If>`, `<SetValue>`, `<SetQueryString>`, `<FromElement>`, `<Add>`, `<Constant>`.
  - Validation: `docs/src/routes/validation/index.tsx` converted to `<Program>` with NotEmpty-driven input/blur/submit behaviors updating `#name-error`.
- Compiler: `libraries/components/src/transform/compile/toEngineIr.ts`
  - Supports: Constant, FromElement, Add, NotEmpty, SetValue, SetQueryString, On.
  - New: If control compiled to `Act.If`; On handlers may be action or conditional.
  - Anchor inference: infers from FromElement args; also respects `target` and last element `data-ir-id`.
- Hydration: Shared hydrator `docs/src/hydrate/engine.ts` reads `script#ir-root` and binds events.
- E2E tests:
  - Tutorial: passing.
  - Validation: added at `docs/tests/e2e/validation/index.test.ts` (blur shows Required, input clears, submit validates + prevents nav). Passing.
- Builds: `deno task --cwd docs build` succeeds; hydrate bundle OK.
- Temporary: Root type-check narrowed to docs/engine/components to avoid unrelated toolkit errors.
  - See `deno.jsonc` task `type-check` (scoped); we’ll restore later after fixing toolkit and component typings.

## What to do next
1) Documentation: Add a short “Authoring behaviors with Program” section in docs (pattern, props, examples).
2) Compiler mapping: Add more primitives as needed (Multiply, Equals/NotEquals, And/Or, numeric/boolean coercions) and wrappers to match.
3) A11y polish on Validation:
   - Add `required` and `aria-describedby="name-error"` to the input; add an a11y E2E.
4) Dev/prod attributes: Add a post-hydration or build-time step to strip `data-ir-id` in production.
5) CI hygiene: Fix components/toolkit type issues, then restore the root `type-check` to full scope.

## How to verify
```sh
# Build docs
deno task --cwd docs build

# Run E2E (tutorial + validation)
deno task --cwd docs test:e2e

# Scoped type-check (temporary)
deno task type-check
```

## Files of interest
- Authoring (docs):
  - `docs/src/routes/tutorial/index.tsx`
  - `docs/src/routes/validation/index.tsx`
- Hydration (client): `docs/src/hydrate/engine.ts`
- Components (wrappers/controls):
  - `libraries/components/src/transform/control/Program/index.tsx`
  - `libraries/components/src/transform/control/On/index.tsx`
  - `libraries/components/src/transform/control/If/index.tsx`
  - `libraries/components/src/transform/actions/SetValue/index.tsx`
  - `libraries/components/src/transform/actions/SetQueryString/index.tsx`
  - `libraries/components/src/transform/comparators/NotEmpty/index.tsx`
  - `libraries/components/src/transform/injectors/{FromElement,Constant}/index.tsx`
  - `libraries/components/src/transform/operators/Add/index.tsx`
- Compiler: `libraries/components/src/transform/compile/toEngineIr.ts`
- Tests: `docs/tests/e2e/{tutorial,validation}/index.test.ts`
- Workspace config: `deno.jsonc`, `docs/deno.jsonc`

---

## Paste this to resume next session
Continue phase-2 exactly where we stopped. Context recap:
- Program-based inline authoring works on Tutorial and Validation.
- Compiler supports If → Act.If, constant/element/add injectors, and anchor inference.
- Hydration via shared client script; both tutorial and validation E2E pass.
- Root type-check is temporarily narrowed to docs/engine/components.

Do the following:
1) Write a docs section about authoring with Program (brief, with example from Tutorial + Validation).
2) Extend compile mapping with Multiply, Equals/NotEquals, And/Or, and light numeric/boolean coercions; add marker wrappers accordingly.
3) Validation a11y: add required + aria-describedby and a small a11y E2E.
4) Plan and implement a safe step to strip data-ir-id in prod builds.
5) Address components/toolkit type errors, then restore the root type-check task to full scope.

Verify with:
- Build docs
- Run all docs E2E
- Scoped type-check (for now), then full type-check after the fixes.
