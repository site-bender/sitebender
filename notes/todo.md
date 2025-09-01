# Project TODOs (high‑value next steps)

Short, high‑leverage items to tackle incrementally while keeping the repo green.

## Visualization
- [ ] Implement Viz.Line authoring wrapper and IR node shape (container + data operand + props).
- [ ] Add a minimal chart adapter (Chart.js or Vega‑Lite) behind a renderer interface; SSR emits a placeholder.
- [ ] Provide a tiny demo page + test that compiles a Viz.Line and verifies container SSR markup.
- [ ] Add data shaping examples using GroupBy/Aggregate pipelines; ensure types stay strict.

## Logging & Telemetry
- [ ] Implement Log component (structured), default console/JSON sink.
- [ ] Implement Trace component and OpenTelemetry server adapter (no‑op in browser by default).
- [ ] Add Breadcrumb and Track (analytics) components with a no‑op adapter by default.
- [ ] Redaction rules: configurable PII path list applied at sink boundary.

## Debug (dev‑only)
- [ ] Implement Debug.Log/Debug.Value/Debug.State that compile under a dev flag and strip in prod.
- [ ] Add a compile‑time dev/prod toggle and tests that ensure Debug nodes are omitted in prod builds.

## Auth follow‑ups
- [x] Wire default policy registration into bootstrap so IsAuthenticated is available by default.
- [x] Add HasRole policy and When.Authorized args (e.g., roles: string[]).
- [x] Add From.Authenticator injector (SSR‑safe) and a guard helper for 401/403 flows.

## Docs
- [ ] Expand VIZ.md with renderer adapter interface sketch and a minimal end‑to‑end diagram.
- [ ] Update AUTH.md with examples using When.Authorized with roles.
- [ ] Add a small README section linking Viz/Debug/Log components and their adapters.

## Quality gates
- [ ] Add unit tests for compiler mapping of Viz.*, Log, Debug under dev/prod flags.
- [ ] Add lint/type checks for new files to existing tasks; keep the repo green on each slice.

---

Working rules: small slices, explicit interfaces (no ReturnType pyramids), maintain precise HTML/ARIA typings, SSR‑safe by default. No deprecations or aliases during development; we freely make breaking changes until we lock the API.

Added by the dev: we will also eventually need to set up import_maps for dev and prod so that the apps when deployed on Deno Deploy will use the online versions of the libraries, while in dev the will link directly to the local folders so that changes are instantly available.
