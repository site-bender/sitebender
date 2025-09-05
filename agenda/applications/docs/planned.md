## Docs app — planned

Content
- [ ] Expand “Authoring behaviors with Program” with copy-paste snippets and IR JSON previews.
- [ ] Add validation a11y recipes: required, aria-describedby, aria-live; include pitfalls and fixes.

Build/runtime
- [ ] Strip `data-ir-id` in production post-hydration; keep dev fingerprints.
- [ ] CSP and offline notes in README; ensure routes render without JS.

Cross-linking
- [ ] Link to Engine/Components planned and suggestions pages; add “see also” in route footers.

Acceptance criteria
- Docs examples work no-JS and with hydration; a11y E2E passes; `data-ir-id` not present in prod HTML.
