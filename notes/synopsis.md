# Sitebender phase-2 \u2014 Updated Synopsis (from notes/)

Date: 2025-09-02

## Executive summary
Sitebender is a progressive-enhancement web platform built around a tiny, declarative JSX DSL that compiles to a stable Engine IR. From this IR we derive: semantic HTML (SSR/SSG), client hydration (events, validation, conditional UI), calculations, andover timesemantic artifacts (JSON-LD, OWL/SHACL) and data-driven UI. Baseline pages work without JavaScript; JS adds reactive behavior. The long-term goal is an AI-assisted, intent-based authoring experience where non-coders compose full apps via a small, natural-language vocabulary.

The notes clarify and extend the Engine synopsis in four big ways:
- Canonical naming and authoring vocabulary (When/Is/From, bare-verb Actions, Program control).
- A data model layer (Vault/Collection/Field/Item) that compiles to SHACL/OWL and powers schema-driven forms.
- A broader platform surface: Auth, Visualization/Telemetry/Debug, and clear testing/DI practices.
- Local infra for observability and RDF (Fuseki + Prometheus/Thanos/Grafana/MinIO) with TLS via Caddy.

## Authoring model (DSL  IR  SSR/CSR)
- Components-first authoring; no imperative JS in the DSL. Expressions are trees of constructors/markers.
- Namespaces and canon (per notes/naming.md):
  - Events: When.* (aliases: On.*)  When.Clicked, When.Submitted, When.ValueUpdated, When.ChangeComplete, When.GainedFocus, When.LostFocus
  - Comparators: Is.*  Is.Equal, Is.NotEmpty, temporal/date/time families, length and numeric bounds, matching, set membership
  - Injectors: From.*  From.Element, From.Constant, From.QueryString, From.LocalStorage, From.Store; planned From.SPARQL
  - Actions: bare verbs  SetValue, Submit, SetQueryString, Publish, NavigateTo; future SaveItem/DeleteItem
  - Operators: prefer plain verbs (Add, Multiply, )
  - Control: If/Conditional (+ slots: Condition/IfTrue/IfFalse); Validation; Program (authoring wrapper used in docs)
- Anchoring & IDs: behaviors bind to nearest stable data-ir-id (or id/name). Deterministic IDs; explicit for/anchor override supported.
- IR: versioned, discriminated-node shapes for element/injector/operator/comparator/conditional/validator/action/on; single root script tag (application/engine+json) for hydration.
- Runtime: one evaluator with an environment boundary (server/client). Hydrator registers default executors, resolves anchors, and binds events/validators/conditionals. Minimal FRP store and a local pub/sub bus live in engine runtime.

## Data-driven UI (Vault/Collection/Field/Item)
- Vision (charter/plan): Treat Vault as the apps private boundary; Collections define schema; Fields carry constraints expressed with existing comparator graphs. 
- Build pass emits SHACL (and minimal OWL) from Vault IR; schema-driven forms render via <Form collection=""> with fields autogen, reusing the same Validation graphs.
- Adapter path: a thin SPARQL adapter for Apache Jena Fuseki (local dev) and a From.SPARQL injector for options/data (SSR-safe when server-enabled). Future writes guarded behind capabilities (SPARQL Update).

## AuthN/AuthZ
- Authoring wrappers: When.Authenticated, When.Authorized(policy, fallback). Policy combinators: HasRole/HasAnyRole/HasAllScopes/InOrg/IsOwner/IsAuthenticated.
- Injector: From.RequestAuth (server-only) to populate LocalValues.user.
- SSR guard: guardRoute(policy)  { allow | redirect | status } for route protection.
- Adapters: JWT-cookie baseline; session store; OAuth/OpenID later. Defaults are fail-closed; no secrets in client code.

## Visualization, logging, and debug
- Viz components (Viz.Line/Bar/Area/Pie) compile to IR viz nodes with a renderer-agnostic container (SSR). Client hydration delegates to a pluggable adapter (Chart.js/Vega-Lite/ECharts). Data arrives via normal operand pipelines (GroupBy/Aggregate/Map/Filter over From.*).
- Telemetry: Log, Trace, Breadcrumb, Track, PageView  structured effect nodes routed via adapters (console/JSON by default; OpenTelemetry on server; analytics providers optional). Redaction rules at sink boundary.
- Debug (dev-only): Debug.Log/Debug.State/Debug.Value compile behind a dev flag and strip in prod.

## Testing & DI
- Test behaviors, not implementation; E2E-first (Playwright + axe), then integration, property-based; unit only when necessary.
- No mocking of our own code. Use DI at the edges (DOM, storage, time, random, fetch). Provide test helpers (createTestDom, storage, fetch).
- Targets: WCAG 2.3 AAA; deterministic compilation (same input  same IR); performance envelopes for test suite.

## Local infrastructure (dev)
- Docker stack with Caddy TLS on *.localhost; services reverse-proxied with basic auth for dashboards.
  - Fuseki (RDF/SPARQL)  dev only
  - Prometheus + node-exporter  Thanos Sidecar  MinIO (S3) + Thanos Store + Thanos Querier  Grafana
- Ports + aliases documented; provisioning for Grafana datasources/dashboards in ops/.
- Recommendations: rotate credentials; consider SSO/OIDC; add Thanos Compactor; refine Prometheus block durations per env.

## Status and plan (phase-2 notes)
- Docs app: Program-based inline authoring live on Tutorial/Validation; shared hydrate script; passing E2E examples.
- Components compiler: toEngineIr supports Constant/FromElement/Add/NotEmpty/SetValue/SetQueryString/On; If lowers to Act.If; anchor inference in place.
- Engine: default executors for common comparators/logical/temporal; hydrator binds on input/change/blur/submit and runs comparators.
- Registries: refactor away from dynamic imports to explicit, tree-shakeable registries is planned.
- IR contracts: IDs/versioning/meta fields, strict node shapes, JSON Schema v1 in scope.
- Naming canon: finalized for authoring; Actions bare verbs; Events When.*, keep On.* aliases.
- Next slices (from prompts/plan):
  - Extend compile mapping (Multiply, Equals/NotEquals, And/Or, simple coercions).
  - Validation a11y polish (required + aria-describedby; add E2E).
  - Strip data-ir-id in prod builds.
  - Viz: container hydration + adapter contract + unit tests; noop adapter wired in docs.
  - Auth: HasRole policy; From.RequestAuth; SSR guard helper.
  - CI hygiene: restore full type-check; alias guard; tests green per package.

## Open questions and risks
- Microservices: keep a boundary-first design (adapters/registries) and avoid premature service splitting; edge functions on Deno Deploy remain the public API. Evaluate service decomposition only when clear ownership, scaling, and failure domains demand it.
- Expressivity pressure: gate DSL growth behind IR contracts and tests; prefer compiler passes over new surface area.
- Debuggability: prioritize an playground that visualizes dataflow over the IR and policy evaluations.
- Performance: adopt explicit registries, partial evaluation for pure subtrees, memoize injectors/ops, and lazy hydration.

## North star
A small, readable vocabulary in JSX, compiled deterministically to an auditable IR that powers UI, validation, and data semantics across SSR/SSG/CSR. Non-coders describe what they want; Sitebender handles the howaccessibility, semantics, reactivity, and data.
