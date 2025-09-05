## Suggestions and notes — Components

- Validation UX
  - Provide an opinionated pattern: `required`, `aria-describedby`, `aria-live` on error region, and class hooks. Include a helper snippet in docs.
  - Consider a tiny `WithValidationMessage` semantic wrapper to pair inputs with hint/error regions (still outputs plain HTML).
- Compiler diagnostics
  - Surface `meta.debug.warnings` in the docs playground UI next to the JSX editor; link to guidance.
  - Add rule: comparator/operator arity checks and a hint when `On` has no anchor target in scope.
- Authoring ergonomics
  - Offer `When.*` sugar wrappers (authored in Components) that simply return `On` markers with canonical names. Keep `On` for low-level control.
- A11y and semantics
  - Ship a docs page with canonical a11y recipes for forms (labels, hints, errors, groups, fieldsets) using only native HTML + minimal attributes.
- Production stripping
  - Provide a small helper to strip `data-ir-id` post-hydration and to reattach a debug fingerprint in dev for troubleshooting.
