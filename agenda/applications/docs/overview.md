## Docs app — overview

Purpose
- Serve documentation, tutorials, lab exercises, and live examples that demonstrate Components authoring → Engine IR → Hydration.
- Operate SSR-first with no-JS usability; progressively enhance via a shared hydrator.

Architecture
- Pages: authored in TSX with the custom JSX runtime; components render semantic HTML.
- Behaviors: colocated using Components control wrappers (`On`, `If`, `Validation`) and emitted via `<Program>`.
- Hydration: a shared client script reads `<script type="application/engine+json" id="ir-root">` and binds events.
- Testing: Playwright E2E for author guides; unit tests for compile/golden cases.

Routes (exemplars)
- Tutorial: event authoring patterns (input/change/submit), actions (SetValue/SetQueryString/Publish).
- Validation: live validation using comparator graphs (NotEmpty, Matches, etc.) and a11y recipes.
- Playground link-out: deep-dive for JSX→IR visualization.

Operational notes
- CSP strict by default; offline-capable where reasonable; docs build outputs a static site.
