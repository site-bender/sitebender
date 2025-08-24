# PLAN OF ATTACK: Declarative JSX DSL → Adaptive IR → SSR/SSG/CSR Hydration

Date: 2025-08-24

## Goal
Build a JSX-first, purely declarative authoring experience that compiles to a stable, versioned IR/AST (no functions in JSON), which can be serialized, rendered (SSR/SSG), and hydrated on the client to compose operators/comparators/injectors for validation, conditional display, calculations, and events—without authors needing to write JavaScript.

Libraries in play:
- adaptive: typed IR, composition (operators/comparators/injectors), evaluator/renderer, hydrator
- components: JSX DSL that emits the IR (no VDOM)
- toolkit: environment adapters, utilities, schema/validation, dev tooling

## Big picture
- Treat JSX as a declarative surface that lowers into a compact, versioned IR.
- Keep a single async evaluator/renderer that runs identically in server and client, behind an environment interface for IO (DOM, storage, URL, time, fetch, etc.).
- Events and validation are declared as nodes in the IR; handlers/actions resolve to composed graphs at hydrate time.
- Store only data and kinds in JSON (never functions); compose functions during hydration.

## Requirements checklist
- Declarative JSX composing primarily via components-as-children instead of props
- Nodes can be elements or evaluation graphs; leaves of eval graphs are injectors
- Async, error-accumulating evaluation across the whole tree
- Extract one big JSON/JS object (IR) suitable for SSR/SSG/CSR
- Hydrate validators, conditionals, and events on the client
- Maintain SSR/SSG/CSR parity with clear environment boundaries
- Versioned schema with migrations and validation

All items above are addressed in the sections below and in the MVP.

## IR/AST shape (discriminated unions)
Common fields
- v: schema version (number or semver string)
- id: stable node id
- kind: discriminant
- meta?: source map, debug info
- datatype?: for typed nodes

Node kinds (minimum viable set)
- ElementNode
  - { kind: "element", tag: string, attrs: Record<string, string|boolean|number>, children: Node[] }
- InjectorNode<T>
  - { kind: "injector", injector: "Constant" | "FromQueryString" | "FromElement" | "FromLocalStorage" | ..., datatype: DataType, args: Record<string, unknown> }
- OperatorNode<T>
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
- DataType is a closed set: "String" | "Integer" | "Float" | "Boolean" | "PlainDate" | "DateTime" | ...
- Keep JSON schema strict and versioned.

## JSX → IR strategy
- Provide a custom jsxImportSource for components to emit IR directly.
- Namespaces to keep authoring clear and avoid prop-heavy APIs:
  - HTML-ish components: <Form>, <Para>, <Input>, ... → ElementNode
  - Operators: <Op.Add>, <Op.Subtract>, <Op.ProportionedRate>, ... → OperatorNode
  - Comparators: <When.And>, <When.IsEmailAddress>, <When.IsNoShorterThan>, ... → ComparatorNode
  - Injectors: <From.Constant>, <From.QueryString>, <From.Element>, <From.LocalStorage>, ... → InjectorNode
  - Control: <Conditional>, <Validation>, <On event="...">...</On>
- Prefer children-first composition; props for ergonomics only (e.g., label="Email").

## Typing, async, and error model
- Everything evaluates as Promise<Result<T, AdaptiveError[]>> (Result preferred over Either: ok/error naming is clearer).
- Each operator/comparator/injector advertises input/output types; enforce at compile time and validate at runtime.
- Error accumulation includes a breadcrumb path (node.id chain) and the failing config/value.
- ComposeContext for evaluation: { env, signal, now, cache, logger }.

## Rendering and hydration
- SSR/SSG: render ElementNode to HTML, embed IR near the root via one of:
  - <script type="application/adaptive+json" id="ir-root">{...}</script>
  - or data-ir="id:ir-root" markers on elements
- Hydration on client:
  - Parse IR, walk tree once
  - Find ValidatorNode and EventBindingNode; compose functions from referenced subgraphs
  - Attach to element properties (not attributes); then remove or fingerprint the markers
  - Lazy-hydrate: defer composition until element is in view or on first interaction

## SSR/SSG/CSR parity and environment
- Single evaluator/renderer usable in any runtime.
- Environment adapters:
  - serverEnv: URL/query, no DOM; DOM injectors produce a typed error or defer
  - clientEnv: DOM, storage, URL, etc.
- DOM-dependent injectors are explicit so SSR cannot rely on them implicitly.

## Performance considerations
- Partial evaluation at build for pure subtrees and constants.
- Memoize injectors by (node.id, key) and operator/comparator results by (node.id, input hashes).
- Lazy hydration for event handlers and validators.
- Tree-shake injectors/operators/comparators by kind via explicit registries.

## Security considerations
- Strict whitelist of node kinds and args; reject unknown kinds.
- Validate IR with JSON Schema (dev always; optional light check in prod).
- No eval or dynamic code generation; no functions in JSON.
- Sanitize selectors and external inputs; cap resource usage (timeouts, depth limits).

## Developer experience and tooling
- Source maps from JSX to IR nodes for precise error overlays.
- ESLint rules:
  - Enforce that leaves of operator/comparator trees are injectors
  - Forbid illegal shapes or mismatched datatypes
- Schema versioning + small migrator (vN → vN+1) with codemods for JSX when needed.
- Golden tests: JSX → IR → evaluate → HTML snapshot.

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

## Minimal MVP slice
Scope: one email form with Validation and one Conditional block.
Deliverables
- IR schema v1 + JSON Schema
- JSX factory that emits IR (components package)
- Renderer: ElementNode → HTML string (adaptive)
- Evaluator minimal set:
  - Injectors: Constant, FromQueryString, FromElement
  - Comparators: And, IsNotEmpty, IsEmailAddress, IsNoShorterThan, IsNoLongerThan
  - Control: Conditional
- Hydrator that binds validation to input and form submit
- SSR demo + client hydration script
- Tests: 5–8 goldens + async error accumulation tests

## Versioning and migrations
- Include v on every node and schemaId at the document root.
- Ship a tiny migrator and test each migration with fixtures.

## Risks and mitigations
- IR sprawl → Keep core small; require RFC for new kinds
- Type drift → Central registry for kinds with compile-time typing
- SSR/DOM gaps → Explicit DOM injectors and server fallbacks
- Performance → Partial evaluation, memoization, lazy hydration

## Next steps
1) Finalize IR schema v1 and JSON Schema
2) Implement jsxImportSource and minimal component namespaces
3) Implement evaluator/renderer for MVP kinds
4) Build hydrator with validator + event binding
5) Wire SSR/SSG demo and tests
6) Add dev overlay + basic ESLint rules

## Final take
The architecture is sound. Prioritize a small, stable IR and one async evaluator behind an environment boundary. Make events and validation declarative, avoid functions in JSON, and version everything. Once the MVP works end-to-end, adding new operators/comparators/injectors becomes mechanical.
