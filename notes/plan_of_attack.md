# PLAN OF ATTACK: Declarative JSX DSL → Adaptive IR → SSR/SSG/CSR Hydration

Date: 2025-08-24
## Current state (2025-08-29)

- Components compiler (toAdaptiveIr) is producing EventBinding/action/comparator/injector IR for control nodes (<On>, <If>, <Validation>) and transform wrappers.
- Default executors are registered in adaptive for equality/logical, InSet, Matches/DoesNotMatch, and full temporal families (Date/Time/DateTime, including Same/Not* variants).
- New JSX wrappers exist and are wired end-to-end (e.g., IsSameDate/Time/DateTime, IsNotAfterDateTime, IsNotBeforeDateTime).
- Compiler diagnostics cover arity/shape for logical, equality, matching, set membership, and temporal families; warnings are surfaced in node meta.
- Goldens added for JSX → IR covering: Conditional/If (slots and sugar), nested If branches, Matches in conditions, On anchor inference/target override, multiple On bindings, and multi-action handler selection; plus a minimal Validation golden using the scaffold.
- Test status (strict): Components 54/54, Adaptive 22/22 (green at time of writing).
Note: Beyond the MVP, additional comparators are already implemented and tested (equality, set membership, matching with safe regex, and temporal Date/Time/DateTime families).

## Status snapshot (2025-08-29)
  - Control components implemented and in-use:
    - Validation, Conditional/If (+ slots: Condition/IfTrue/IfFalse), and On markers
  - Compiler:
    - `libraries/components/src/transform/compile/toAdaptiveIr.ts` produces IR with EventBinding and Action nodes; thin wrappers call adaptive constructors directly
    - Minimal compiler scaffold remains for Validation-only flows (`compile/minimal.ts`)
  - Adaptive runtime:
    - Default executor registration includes Matches/DoesNotMatch, InSet, and full temporal Date/Time/DateTime families (Same and Not* variants)
  - Diagnostics:
    - Arity/shape guards for logical/equality/matching/set/temporal families
  - Tests:
    - Goldens for JSX → IR (Conditional/If, On, Validation); runtime tests for matching, set membership, and temporal comparators
  - IR v1 JSON Schema (including ScriptNode and behavior nodes)
  - Renderer and hydrator scaffolds for MVP kinds; root IR embedding and hydrate walk
  - Demo: SSR/SSG page that hydrates On/Validation/Conditional; add one hydration smoke test
  - Docs/examples: update examples to reflect current wrappers (<If> slots and sugar, On anchor inference, Matches in conditions, temporal Same)

## Next steps
1) IR schema v1
  - Author JSON Schema (with version + schemaId) and validate in dev
  - Include ElementNode, Injector/Operator/Comparator, Conditional, Validator, EventBinding, ScriptNode
2) MVP renderer + hydrator
  - Render ElementNode → HTML with microdata; emit JSON-LD scripts
  - Hydrate validators, events, and conditional display; lazy by default
3) Demo
  - Wire a tiny SSR/SSG demo page using the email form and a Conditional block; include client hydration script
## Example and notes
Original idea (simplified and with a fixed closing tag):

```tsx
<Form class="form">
  <EmailField name="email" label="Email" help="We’ll never share your email." required>
    <Validation>
      <When.And>
        <When.IsNotEmpty />
        <When.IsEmailAddress />
        <When.IsNoShorterThan>
          <From.Constant datatype="Integer">6</From.Constant>
        </When.IsNoShorterThan>
        <When.IsNoLongerThan>
          <From.Element datatype="Integer" source="input#max-length" />
        </When.IsNoLongerThan>
      </When.And>
    </Validation>
  </EmailField>

  <Conditional>
    <Condition>
      <When.IsBeforeAlphabetically>
        <Operand>
          <From.Constant datatype="String">Bob</From.Constant>
        </Operand>
        <Test>
          <From.QueryString datatype="String" key="name" />
        </Test>
      </When.IsBeforeAlphabetically>
    </Condition>
    <IfTrue>
      <Para>You get to go first!</Para>
    </IfTrue>
    <IfFalse>
      <Para>Sorry, but Bob goes first.</Para>
    </IfFalse>
  </Conditional>
</Form>
```

Updated minimal example using current wrappers and control patterns:

```tsx
<div>
  <input id="email" />
  {Validation({ when: "input", children: NotEmpty({ children: FromElement({ id: "email" }) as unknown as JSX.Element }) as unknown as JSX.Element })}

  {On({
    event: "Change",
    children: If({
      children: [
        Condition({ children: Matches({ children: [
          FromElement({ id: "email" }) as unknown as JSX.Element,
          Constant({ value: "@" }) as unknown as JSX.Element,
        ] }) as unknown as JSX.Element }) as unknown as JSX.Element,
        IfTrue({ children: Publish({ topic: "looks-like-email" }) as unknown as JSX.Element }) as unknown as JSX.Element,
        IfFalse({ children: Publish({ topic: "not-email" }) as unknown as JSX.Element }) as unknown as JSX.Element,
      ],
    }) as unknown as JSX.Element,
  })}

  {On({
    event: "Change",
    target: "email", // explicit target overrides inference
    children: SetValue({ selector: "#status", value: Constant({ value: "changed" }) as unknown as JSX.Element }) as unknown as JSX.Element,
  })}

  {On({
    event: "Change",
    children: Publish({ topic: "chained-binding" }) as unknown as JSX.Element,
  })}
</div>
```
## Detailed plan (reference)

Date: 2025-08-24

## Decisions locked (2025-08-24)

- IR embedding: single root `<script type="application/adaptive+json" id="ir-root">…</script>` plus per-element `data-ir-id` markers for deterministic hydration.
- Versioning: `v` is semver; starting at `"0.1.0"`.
- Namespaces for JSX wrappers (short, readable): `From.*`, `Op.*`, `When.*`, `Act.*`, `On.*`.
- Deterministic IDs: `id = "n_" + base58(blake3(pageSeed | nodePath | anchor | kind | tag | stableAttrs)).slice(0, 12)`; collision guard extends length to 14 if a per-page collision is detected during build. `pageSeed` = route path (or build-provided seed). IDs are emitted into HTML via `data-ir-id` (and `id` attribute when appropriate) and are not recomputed from the live DOM during hydration.
- Comparator naming: prioritize clarity. Examples:
  - Length: `When.MinLength (>=)`, `When.MaxLength (<=)`
  - Numeric: `When.GreaterThan (>)`, `When.GreaterThanOrEqual (>=)`, `When.LessThan (<)`, `When.LessThanOrEqual (<=)`
  - Email: `When.IsEmailAddress`
- Bus/pub-sub scopes: default scope is `"local"` (DOM `CustomEvent`). Cross-tab (`BroadcastChannel`) and cross-device (WebSocket/SSE) are opt-in only and feature-detected. Exposed via `ComposeContext.bus` with `publish/subscribe/unsubscribe`.
- State model MVP: SSR-friendly sources (QueryString, FormElement, Dataset, Cookie, Local/SessionStorage) and sinks (SetValue, SetStorage, SetCookie, SetQueryString, Submit, Publish) with identical IR across SSR/CSR.
- MVP tags to implement and register:
  - Injectors (`From`): `Constant`, `Element`, `QueryString`, `LocalStorage`
  - Operators (`Op`): `Add`, `Multiply`
  - Comparators (`When`): `And`, `IsEmailAddress`, `MinLength`
  - Actions (`Act`): `SetValue`, `Submit`, `SetQueryString`, `Publish`
  - Events (`On`): `Input`, `Change`, `Blur`, `Submit`

## Goal
Build a JSX-first, purely declarative authoring experience that compiles to a stable, versioned IR/AST (no functions in JSON), which can be serialized, rendered (SSR/SSG), and hydrated on the client to compose operators/comparators/injectors for validation, conditional display, calculations, and events—without authors needing to write JavaScript.

Libraries in play:
- adaptive: typed IR, composition (operators/comparators/injectors), evaluator/renderer, hydrator
- components: JSX DSL that emits the IR (no VDOM)
- toolkit: environment adapters, utilities, schema/validation, dev tooling

Repository conventions (for tree shaking and clarity)
- One function/component per folder, default export, file named `index.ts`/`index.tsx`.
- No barrel files/re-exports, except explicit alias shims when necessary.
- All imports are direct to files; dynamic imports are allowed when helpful.
- Keep modules side-effect-free so bundlers can tree-shake aggressively.

## Big picture
- Treat JSX as a declarative surface that lowers into a compact, versioned IR.
- Keep a single async evaluator/renderer that runs identically in server and client, behind an environment interface for IO (DOM, storage, URL, time, fetch, etc.).
- Events and validation are declared as nodes in the IR; handlers/actions resolve to composed graphs at hydrate time.
- Store only data and kinds in JSON (never functions); compose functions during hydration.

## Charter alignment: Vault → IR → SHACL/OWL → Fuseki
- Scope: integrate CHARTER’s data model (Vault/Collection/Item/Field) without refactoring current MVP.
- IR additions (no breaking changes):
  - Add Vault family nodes to IR: `VaultNode`, `CollectionNode`, `FieldNode` with datatypes, constraints, and optional default/enum/source.
  - Represent constraints using existing comparator graphs where possible; attach them to `FieldNode` (mirrors Validation) to keep one source of truth.
  - Emit artifacts via a generator pass (build-time):
    - SHACL Shapes from Vault/Collection/Field → Turtle (file output) and/or JSON-LD (as `ScriptNode`).
    - Minimal OWL class/property declarations derived from Collections/Fields.
- Store adapter (local-first):
  - Add a thin SPARQL adapter (HTTP) targeting a local Apache Jena Fuseki (Homebrew install) with env config (endpoint URLs, dataset name).
  - New injector: `From.SPARQL` (query, bindings) → returns rows; SSR-safe if adapter is enabled server-side.
  - Optional action: `Act.SPARQL.Update` for controlled writes (post-MVP guarded behind capabilities).
- Schema-driven forms:
  - `<Form for="CollectionName">` compiles by reading the Vault IR and generating fields (type → widget mapping); field-level Validation reuses the same comparator graphs.
  - Option sources: enum values or SPARQL query via `From.SPARQL` to populate choices (e.g., `<Form.ChooseOne optionsFrom={From.SPARQL(...)} />`).
- Namespaces & component names (harmonization without churn):
  - Keep current `On.*` for events; add `When.Clicked`/`When.Submit` as aliases that lower to `On.*` to satisfy CHARTER language while avoiding refactors.
  - Keep comparators under `When.*` for MVP; add light `Is.*` alias wrappers that lower to the same comparator tags (e.g., `Is.Equal` → `When.IsEqual`).
  - Reserve `Vault.*`, `Form.*`, `Entity.*` for data-driven UI; wrappers remain thin and return IR markers only.
- Testing/dev ergonomics:
  - Golden tests for Vault JSX → IR (Collections/Fields, constraints).
  - Snapshot SHACL/OWL generators with small fixtures; smoke test SPARQL adapter against a local Fuseki (skippable in CI).

Milestones (thin slices)
1) IR schema v1.1: add Vault/Collection/Field kinds (no runtime usage yet); doc JSON Schema updates.
2) Generator pass: Vault → SHACL (Turtle) + minimal OWL; write to `docs/dist/data/` and expose as optional `ScriptNode` JSON-LD.
3) SPARQL adapter + `From.SPARQL` injector (read-only) with env-driven endpoints.
4) Schema-driven `<Form for="…">` that renders fields from Vault IR; enum/options can come from constants or `From.SPARQL`.
5) E2E demo: define a tiny Vault (Customer/Product), generate SHACL, run Fuseki locally, populate options via SPARQL, and render the form; add one hydration smoke test.

## Requirements checklist
- Declarative JSX composing primarily via components-as-children instead of props
- Nodes can be elements or evaluation graphs; leaves of eval graphs are injectors
- Async, error-accumulating evaluation across the whole tree
- Extract one big JSON/JS object (IR) suitable for SSR/SSG/CSR
- Hydrate validators, conditionals, and events on the client
- Maintain SSR/SSG/CSR parity with clear environment boundaries
- Versioned schema with migrations and validation

All items above are addressed in the sections below and in the MVP.

## Addendum (2025-08-24): Registries, ComposeContext, IDs/Versioning, Testing

- Use explicit registries (no dynamic import paths) in adaptive:
  - `operations/registries/{operators,injectors,comparators}.ts` map tags → executors
  - Composers resolve by tag via registries; no reliance on `comparison` on config
- ComposeContext threads evaluation with `{ env, signal, now, bus, logger }` to unify SSR/CSR, enable cancellation/memoization, and avoid globals. `bus` defaults to local-scope pub/sub; cross-tab/device are opt-in.
- Add `v` (semver), `id` (stable, user-supplied or generated via toolkit `generateShortId()`), and optional `meta` to all config nodes
- Use toolkit ResultAsync throughout adaptive (public surfaces); avoid expanding Either in adaptive
- Injectors support `evaluation: "eager" | "lazy"` and caching by (`node.id`, key) with invalidation; SSR-safe injectors use server env, DOM-only injectors defer
- Behavior anchoring: attach to nearest element with stable `id`/`name`; auto-assign deterministic ID if missing; allow explicit override (`for` or `anchor`)
- Tests: add goldens (JSX → IR → HTML snapshot) and smoke tests (registry resolution, SSR render returns string, hydrate attaches handlers)

## IR/AST shape (discriminated unions)
Common fields
- v: schema version (number or semver string)
- id: stable node id
- kind: discriminant
- meta?: source map, debug info
- datatype?: for typed nodes

Node kinds (minimum viable set)
- ElementNode
  - { kind: "element", tag: string, attrs: Record&lt;string, string|boolean|number>, children: Node[] }
- InjectorNode&lt;T>
  - { kind: "injector", injector: "Constant" | "FromQueryString" | "FromElement" | "FromLocalStorage" | ..., datatype: DataType, args: Record&lt;string, unknown> }
- OperatorNode&lt;T>
  - { kind: "operator", op: "Add" | "Subtract" | "ProportionedRate" | ..., datatype: DataType, args: Node[] }
- ComparatorNode
  - { kind: "comparator", cmp: "And" | "Or" | "IsEmailAddress" | "IsPlainDate" | "IsNoShorterThan" | ..., args: Node[] }
- ConditionalNode
  - { kind: "conditional", condition: ComparatorNode, ifTrue: Node[], ifFalse: Node[] }
- ValidatorNode
  - { kind: "validator", rule: ComparatorNode, scope: NodeId | "self" }
- ActionNode
  - { kind: "action", action: "Submit" | "SetValue" | "Navigate" | ..., args: Node[] }
- EventBindingNode
  - { kind: "on", event: DOMEventName, handler: ActionNode }

Notes
- Leaves of operator/comparator graphs are always injectors.
- DataType is a closed set: "String" | "Integer" | "Float" | "Boolean" | "PlainDate" | "ZonedDateTime" | ...
- Keep JSON schema strict and versioned.

## JSX → IR strategy
- Compilation pass: JSX → component tree → IR. We deprecate the old `helpers/createElement` runtime factory in favor of a proper compile/walk that:
  - Lowers semantic components to ElementNode (attrs, ARIA, data-*, microdata attrs when applicable).
  - Lowers transform/* nodes to adaptive config graphs by calling adaptive constructors directly (thin wrappers only; no re-implementation).
  - Lowers control nodes (Validation, Conditional, On) to behavior IR attached to the nearest anchor element/field.
- Namespaces to keep authoring clear and avoid prop-heavy APIs:
  - HTML-ish: &lt;Form>, &lt;Para>, etc. → ElementNode
  - Operators: &lt;Op.Add>, &lt;Op.Subtract>, ... → OperatorNode via transform wrappers
  - Comparators: &lt;When.And>, &lt;When.IsEmailAddress>, ... → ComparatorNode via transform
  - Injectors: &lt;From.Constant>, &lt;From.QueryString>, ... → InjectorNode via transform
  - Control: &lt;Conditional>, &lt;Validation>, &lt;On event="...">...&lt;/On>
- Prefer children-first composition; rely on props only for ergonomic sugar.

Transform folder scope (important)
- Transform files are thin JSX wrappers that call into adaptive constructors and return adaptive config objects. They must not re-implement adaptive logic or composition.
- One wrapper per constructor, default export, no barrels, side-effect-free for maximal tree shaking.

## Typing, async, and error model
- Canonical error type is toolkit Result/ResultAsync. Public composition APIs return ResultAsync<T, ErrorBag>.
- Async helpers: fromPromise, tryCatchAsync, mapAsync, chainAsync, all/sequence; all honor AbortSignal for cancellation.
- Each operator/comparator/injector advertises input/output types; enforce at compile time and validate at runtime.
- Error handling modes:
  - Short-circuit (default): return first error quickly for performance.
  - Accumulate (validation mode): collect all errors into an ErrorBag for a field/section.
- ErrorBag: immutable with entries { path: NodeId[], code, message, value?, meta? } and monoidal combine; include breadcrumbs to failing node ids/config.
- ComposeContext for evaluation: { env, signal, now, cache, logger }.

## Rendering and hydration
- SSR/SSG: render ElementNode to HTML, embed IR near the root via one script tag: `&lt;script type="application/adaptive+json" id="ir-root">{...}&lt;/script>` and mark elements with `data-ir-id`.
- Hydration on client:
  - Parse IR, walk tree once
  - Find ValidatorNode and EventBindingNode; compose functions from referenced subgraphs
  - Attach to element properties (not attributes); then remove or fingerprint the markers
  - Lazy-hydrate: defer composition until element is in view or on first interaction
  - Resolve behavior anchors (nearest id/name or auto-ID) and record in IR for stable hydration

define/* behavior and metadata
- `_template` controls only visible HTML output. Microdata and JSON-LD are emitted independently (unless disabled) by define components.
- Microdata: represented as attributes on ElementNode and emitted on SSR by default; if driven by injectors, can be updated reactively on the client by re-applying attrs during hydration.
- JSON-LD: represented as a ScriptNode in IR and emitted as a `<script type="application/ld+json">` during SSR by default; optionally re-emitted on the client if underlying data is reactive.

## SSR/SSG/CSR parity and environment
- Single evaluator/renderer usable in any runtime.
- Environment adapters:
  - serverEnv: URL/query, no DOM; DOM injectors produce a typed error or defer
  - clientEnv: DOM, storage, URL, etc.
- DOM-dependent injectors are explicit so SSR cannot rely on them implicitly.
 - SSR by default for semantic HTML, microdata, and JSON-LD; CSR hydration is optional and used for reactive validation, events, conditional display, and reactive metadata when injectors change.
  - ComposeContext carries env to keep evaluators pure and portable across server/client.

## Toolkit integration decisions
- Use toolkit Result as the single error monad across adaptive/components; convert to/from Either/Maybe internally as needed.
- Chainable layer (consumed by adaptive/components) uses Result (Ok may hold a Maybe when appropriate).
- Async: adopt AsyncResult (Promise<Result<...>>), expose composition helpers and cancellation in compose context.
- Validation: support both short-circuit and accumulation; accumulation uses ErrorBag combine.
- Eager and lazy: provide lazy iterator variants (e.g., mapLazy, filterLazy, slidingWithStep) where sensible to avoid large intermediates.
- Import aliases: allowed in docs/ for ergonomics (e.g., @sitebender/toolkit/array/map); libraries keep relative imports per CLAUDE.md.

## Performance considerations
- Partial evaluation at build for pure subtrees and constants.
- Memoize injectors by (node.id, key) and operator/comparator results by (node.id, input hashes).
- Lazy hydration for event handlers and validators.
- Tree-shake injectors/operators/comparators by kind via explicit registries.
 - Offer eager and lazy evaluation modes; prefer lazy for large collections/streams and document trade-offs.

## Security considerations
- Strict whitelist of node kinds and args; reject unknown kinds.
- Validate IR with JSON Schema (dev always; optional light check in prod).
- No eval or dynamic code generation; no functions in JSON.
- Sanitize selectors and external inputs; cap resource usage (timeouts, depth limits).
 - Capability-based effects: any side-effectful action (fetch, storage, navigation) crosses an explicit env boundary; server env denies client-only effects.

## Developer experience and tooling
- Source maps from JSX to IR nodes for precise error overlays.
- ESLint rules:
  - Enforce that leaves of operator/comparator trees are injectors
  - Forbid illegal shapes or mismatched datatypes
- Schema versioning + small migrator (vN → vN+1) with codemods for JSX when needed.
- Golden tests: JSX → IR → evaluate → HTML snapshot.
- Smoke tests: registry resolution by tag, SSR render returns string, hydrate wiring runs without errors.

## Example and notes (legacy DSL; see updated example above)
Original idea (simplified and with a fixed closing tag):

```tsx
<Form class="form">
  <EmailField name="email" label="Email" help="We’ll never share your email." required>
    <Validation>
      <When.And>
        <When.IsNotEmpty />
        <When.IsEmailAddress />
        <When.IsNoShorterThan>
          <From.Constant datatype="Integer">6</From.Constant>
        </When.IsNoShorterThan>
        <When.IsNoLongerThan>
          <From.Element datatype="Integer" source="input#max-length" />
        </When.IsNoLongerThan>
      </When.And>
    </Validation>
  </EmailField>

  <Conditional>
    <Condition>
      <When.IsBeforeAlphabetically>
        <Operand>
          <From.Constant datatype="String">Bob</From.Constant>
        </Operand>
        <Test>
          <From.QueryString datatype="String" key="name" />
        </Test>
      </When.IsBeforeAlphabetically>
    </Condition>
    <IfTrue>
      <Para>You get to go first!</Para>
    </IfTrue>
    <IfFalse>
      <Para>Sorry, but Bob goes first.</Para>
    </IfFalse>
  </Conditional>
</Form>
```

## Minimal MVP slice
Scope: one email form with Validation and one Conditional block.
Deliverables
- IR schema v1 + JSON Schema
- Compile pass that emits IR (components package)
- Renderer: ElementNode → HTML string (adaptive)
- Evaluator minimal set:
  - Injectors: Constant, FromQueryString, FromElement
  - Comparators: And, IsNotEmpty, IsEmailAddress, IsNoShorterThan, IsNoLongerThan
  - Control: Conditional
- Hydrator that binds validation to input and form submit
- SSR demo + client hydration script
- Registries wired (operators/injectors/comparators) and used by composers
- Anchoring implemented (nearest id/name; deterministic auto-ID; explicit `for|anchor` override)
- ResultAsync returned from evaluators/composers in adaptive
- Injectors support `evaluation: "eager" | "lazy"` + caching policy
- Tests: 5–8 goldens + smoke tests + async error accumulation tests

## Versioning and migrations
- Include v on every node and schemaId at the document root.
- Ship a tiny migrator and test each migration with fixtures.

## Risks and mitigations
- IR sprawl → Keep core small; require RFC for new kinds
- Type drift → Central registry for kinds with compile-time typing
- SSR/DOM gaps → Explicit DOM injectors and server fallbacks
- Performance → Partial evaluation, memoization, lazy hydration

## Control components (attach behavior declaratively)
- Validation: wraps a comparator graph (children from transform/*) and binds as a ValidatorNode to the nearest field/element; supports when={'input'|'blur'|'submit'} and message strategy.
- Conditional: wraps a comparator graph plus IfTrue/IfFalse regions, compiling to ConditionalNode.
- On: declaratively binds events; compiles to EventBindingNode with an ActionNode graph handler.

## IR/AST additions
- ScriptNode (JSON-LD): { kind: "script", scriptType: "application/ld+json", content: object }
- Extend ElementNode to carry microdata attributes.
- ValidatorNode to include target anchor (id/name) and timing.
- EventBindingNode to include event name and an action graph.

## Algorithm composition via JSX (optional)
Goal: allow authors to declaratively compose algorithms in JSX, compiled to a safe, whitelisted IR (no eval), executable SSR/SSG/CSR.

IR nodes
- PipeNode: left-to-right composition over a value.
- ParallelNode: run branches concurrently; policy: all | any | first; optional concurrency limit.
- TryNode: try/catch/finally semantics mapping to Result.
- MapNode/ReduceNode/FilterNode: collection transforms (support lazy sources).
- BranchNode/SwitchNode: conditional routing by comparator results or tags.
- WhileNode/UntilNode: bounded loops with max-iterations and timeouts.
- Let/AssignNode: bind intermediate results by name within a local frame (dataflow), no ambient mutation.
- ActionNode: explicit side effects via capability whitelist.

Authoring components (components/transform/algorithms)
- <Algo.Pipe>, <Algo.Parallel limit={n} policy="all|any|first">, <Algo.Try>, <Algo.Map>, <Algo.Reduce>, <Algo.Filter>, <Algo.Branch>, <Algo.Switch>, <Algo.While maxIterations={n} timeoutMs={...}>, <Algo.Let>, <Algo.Assign>, <Algo.Return>.

Security
- Whitelist-only registries for operators/comparators/injectors/actions; no dynamic string lookups.
- JSON Schema validation for Algorithm IR; enforce depth/size/iteration/time budgets at runtime.
- Capability-scoped env for side effects; deterministic by default; seeded randomness via toolkit.

## Status snapshot (2025-08-24)
- Done
  - Control components scaffolded (no DOM rendering):
   - Validation at `libraries/components/src/transform/control/Validation/index.tsx`
   - Conditional at `libraries/components/src/transform/control/Conditional/index.tsx`
   - Slots: Condition, IfTrue, IfFalse under `libraries/components/src/transform/control/slots/*`
  - Minimal compile-to-IR walker scaffold:
   - `libraries/components/src/transform/compile/minimal.ts` (collects elements/text; attaches validation/conditional behaviors)
  - Type-safety: removed any from Conditional; added guards. No toolkit changes.

- In progress / open
  - Event binding: `On` control marker not implemented yet
  - Registries: implement and refactor composers to use them
  - Compiler/Renderer: anchor resolution for behaviors (nearest id/name; auto-ID; explicit `for|anchor`) and broader element detection
  - IR v1 JSON Schema (including ScriptNode and behavior nodes)
  - Renderer and hydrator scaffolds for MVP kinds; root IR embedding and hydrate walk
  - Golden tests for JSX → IR (Validation + Conditional) and async error accumulation; smoke tests for registries/hydrate
  - Align transform wrappers to import adaptive constructors directly (tree-shakeable) where gaps exist

## Next steps
1) Compiler (near-term)
  - Attach behaviors to concrete anchors: prefer nearest previous element with stable id/name; fall back to explicit prop when provided
  - Expand element handling to cover semantic components that wrap HTML tags
  - Emit placeholder ScriptNode when define/* yields JSON-LD
  - Location: `libraries/components/src/transform/compile/*`
2) Controls
  - Implement `On` control marker: `libraries/components/src/transform/control/On/index.tsx`
  - Define minimal ActionNode shapes for MVP (Submit, SetValue, Navigate)
3) IR schema v1
  - Author JSON Schema (with version + schemaId) and validate in dev
  - Include ElementNode, Injector/Operator/Comparator, Conditional, Validator, EventBinding, ScriptNode
4) MVP renderer + hydrator
  - Render ElementNode → HTML with microdata; emit JSON-LD scripts
  - Hydrate validators, events, conditional display; lazy by default
5) Tests
  - Add 5–8 golden tests for JSX → IR, plus 1–2 async error accumulation cases
6) Hygiene
  - Ensure transform wrappers import adaptive constructors directly; remove any remaining barrels; fix import paths if needed
7) Demo
  - Wire a tiny SSR/SSG demo page using the email form and a Conditional block; include client hydration script

## Final take
The architecture is sound. Prioritize a small, stable IR and one async evaluator behind an environment boundary. Make events and validation declarative, avoid functions in JSON, and version everything. Once the MVP works end-to-end, adding new operators/comparators/injectors becomes mechanical.

## Future Plans (post-MVP)
- Offline-first docs app: local storage via IndexedDB; background sync when online.
- CRDT-based collaboration (OSS-first, e.g., Y.js/Automerge) for courses/playgrounds with presence and conflict-free merges.
- AI/LLM integration via MCP for task-focused assistance with strict privacy guardrails.
- Real-time transport evaluation: WebTransport/HTTP/3 with WS/SSE fallbacks.
- Peer-to-peer options for collaborative sessions using WebRTC data channels; optional rendezvous server.
- Strong CSP and privacy posture by default across app; telemetry opt-in only.

### Event bus / pub-sub (decoupled communication)
- Goals: decouple components via typed events; support local page, cross-tab, and cross-device communication.
- Event envelope: `{ v: 1, id, topic: string, ts, source, payload, meta? }` (no functions; JSON-only).
- Local transport: DOM CustomEvent on `document` (namespaced topics, e.g., `sb:FORM_SUBMISSION`).
- Cross-tab: BroadcastChannel (optional; feature-detected) with the same event envelope.
- Cross-device: transport adapter interface supporting WebTransport (HTTP/3) with WebSocket fallback.
- Subscriptions: `subscribe(topic, handler, { once, buffer, replay, scope }) → unsubscribe`.
- Publishing: `publish(topic, payload, opts) → ResultAsync<void, ErrorBag>`; backpressure and size limits.
- Integration: expose `env.bus` via ComposeContext so operators/actions can publish/subscribe without globals.

Runtime placement note
- To avoid cross-team conflicts, the minimal bus and store live under adaptive runtime:
  - Bus: `libraries/adaptive/src/runtime/bus.ts`
  - Store: `libraries/adaptive/src/runtime/store.ts`
  - ComposeContext: `libraries/adaptive/src/context/composeContext.ts`
- Toolkit remains unchanged in this phase; future consolidation can move shared utilities once other work stabilizes.
- Security: topic allowlist, origin checks, optional encryption at transport layer; redaction hooks before egress.
