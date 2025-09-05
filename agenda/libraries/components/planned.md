## Components — planned

Phase 1 — mapping completeness and validation wire-up
- Extend transform+compiler coverage
	- [ ] Map `Multiply`, `Subtract`, `Divide`, `Min`, `Max` wrappers to Engine ops with arity diagnostics.
	- [ ] Map `Is.UnequalTo`, `Is.And`, `Is.Or`, and string/number/boolean coercion helpers.
- Validation attach (end-to-end)
	- [ ] Compile `Validation` marker to Engine IR validator nodes attached to the correct anchor and event (`input|blur|submit`).
	- [ ] A11y polish: expose `aria-invalid`, `aria-describedby` guidance; add docs examples and one E2E.

Phase 2 — auth and viz wrappers
- Auth
	- [ ] `When.Authenticated` and `When.Authorized` wrappers that compile to `Act.If` with policy comparators.
- Viz
	- [ ] Add `Viz.*` container wrappers that compile to renderer-agnostic nodes; ship a noop adapter in apps.

Phase 3 — ergonomics and prod hardening
- Anchors
	- [ ] Deterministic `data-ir-id` synthesis tested; implement build-time stripping for prod in apps whilst keeping a dev fingerprint.
- Forms
	- [ ] Sugar components that scaffold labeled fields from Vault/Collection definitions (schema-driven UI), producing standard HTML + Validation rules.

Phase 4 — typing and tests
- [ ] Restore strict repo-wide type-check for Components once dependency types settle.
- [ ] Add golden tests from JSX fixture → Engine IR JSON → hydrate smoke.

Acceptance criteria
- Clear, copy-paste JSX examples in docs render expected SSR HTML without JS and enable behaviors with JS on.
- Compiler emits arity warnings for underspecified ops/compares; tests snapshot these under `node.meta.debug.warnings`.
- Validation examples set proper a11y attrs and pass E2E and unit assertions.
