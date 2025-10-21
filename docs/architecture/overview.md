# Sitebender Studio - Architecture Overview

> **Status**: Canonical  
> **Last Updated**: 2025-01-07  
> **Purpose**: High-level architectural overview of Sitebender Studio

## What Sitebender Studio Is

Sitebender Studio is a revolutionary web framework where **everything is data**. Applications are not code that manipulates data—they ARE data that describes behavior.

### The Core Philosophy

**Everything is data.** Not just your application—your entire development environment.

Write declarative JSX components. Get a complete application with:
- Validation (client and server)
- Persistence (triple stores)
- Distribution (CRDTs and P2P)
- Offline support (automatic)
- Real-time collaboration (built-in)
- Reactive updates (no virtual DOM)

**Your codebase is a living knowledge graph.** Not documentation that drifts from code, but the code itself transformed into an intelligent, navigable, queryable knowledge system. Every function, every relationship, every interaction measured and optimized.

**We don't test code. We prove it correct.** Through Z3 theorem proving, Auditor mathematically verifies properties hold for ALL inputs, not just test cases. When properties fail, you get exact counterexamples. When they pass, you get machine-checkable proofs.

**Branded types extend JavaScript's type system.** `Integer`, `EmailAddress`, `TwoDecimalPlaces`—compile-time guarantees with zero runtime overhead. No more mixing incompatible values. No more floating-point errors in financial calculations.

### The Revolutionary Approach

```
JSX → Internal Representation → Triple Store → Distributed CRDTs → DOM
```

Every component, behavior, validation rule, and test exists as queryable RDF triples. This enables:
- **Time-travel debugging** - Perfect replay of any state
- **SPARQL queries** - Query your application like a database
- **Formal verification** - Mathematical proofs of correctness
- **AI-safe development** - Cryptographic governance prevents drift

### Who It's For

**Primary Audience:**
- AI assistants building applications through declarative patterns
- Designers creating complete apps without imperative code
- Data scientists working with semantic triple stores
- Hobbyists who want powerful apps without complexity
- Greenfield projects that can start fresh

**NOT For:**
- React developers clinging to 2013 patterns
- Enterprises with legacy migration requirements
- Anyone who thinks classes are good
- Teams that tolerate technical debt

## Core Architecture

### Data Flow

1. Developer writes JSX components
2. Components compile to Internal Representation (IR)
3. IR serializes to RDF triples (JSON/YAML/Turtle)
4. Triples persist in triple store (Oxigraph)
5. Triples distribute via CRDTs (Agent)
6. Triples render directly to DOM (no virtual DOM)
7. Behaviors attach as DOM properties (`__sbCalculate`, `__sbValidate`, `__sbFormat`)

### Why No Virtual DOM

Virtual DOM is overhead from React's 2013 architecture. Sitebender:
- Renders directly to DOM
- Attaches behaviors as properties
- Updates reactively through dependency graphs
- Eliminates diffing and reconciliation

### Why Everything Is Triples

RDF triples enable:
- **Queryability** - SPARQL over your entire application AND codebase
- **Versioning** - Every change is a new triple
- **Distribution** - CRDTs merge triples automatically
- **Verification** - Formal proofs over semantic data
- **AI Understanding** - Machines can reason about structure
- **Living Documentation** - Your code becomes a navigable knowledge graph

This means your codebase itself is stored as triples, creating a complete project intelligence platform where you can query relationships, track complexity, measure developer experience, and navigate through semantic connections—all automatically generated from your actual code.

### Progressive Enhancement & Universal Compatibility

**Every component works everywhere.** From Lynx (1992) to modern browsers. From offline to distributed. From no JavaScript to full enhancement.

#### Three Enhancement Layers

**Layer 1: Pure HTML (Lynx/IE11)**
- Forms submit via POST
- Links navigate
- Tables display data
- Everything functions without JavaScript
- If it works in Lynx, it works everywhere (IE11 proves it works with broken browsers too)

**Layer 2: CSS Enhancement (Graphical Browsers)**
- Visual layouts and typography
- Responsive design
- Still fully functional with CSS disabled

**Layer 3: JavaScript Enhancement (Modern Features)**
- Client-side validation
- Real-time feedback
- Optimistic updates
- Still fully functional with JavaScript disabled

```tsx
<Form concept="Person">
  {/* Layer 1: Works as standard HTML form POST */}
  {/* Layer 2: Enhanced with CSS styling */}
  {/* Layer 3: Enhanced with client-side validation when JS loads */}
  {/* Layer 3: Enhanced with real-time feedback via pub-sub */}
</Form>
```

#### Offline-First Architecture

Applications work offline by default, sync when connected:
- **Local-first** - All data stored locally (IndexedDB, localStorage)
- **Queue operations** - Changes queued when offline
- **Automatic sync** - Syncs when connection restored
- **Conflict resolution** - CRDTs merge changes automatically
- **No data loss** - Everything preserved during offline periods

## The 18 Libraries

Sitebender consists of 18 libraries organized into 6 architectural layers.

**Critical Infrastructure Note:** Pathfinder (Intelligence Layer) serves as foundational infrastructure despite its layer classification. All libraries that need to persist or query RDF triples depend on Pathfinder for triple store access. This ensures a single Oxigraph connection across the entire system.

### Foundation Layer (Infrastructure)

#### **[Toolsmith](../libraries/toolsmith.md)** - Pure functional programming primitives

Zero dependencies. Monads, functors, applicatives with mathematical laws. **40+ branded types** extend JavaScript's type system (`Integer`, `EmailAddress`, `TwoDecimalPlaces`, `IPv4Address`, `Isbn13`, `OklchColor`) with compile-time safety and zero runtime overhead. **Exact decimal arithmetic** eliminates floating-point errors in financial calculations. Neural network activation functions (sigmoid, relu, swish, etc.) with derivatives. Comprehensive domains: math, validation, logic, string, array, crypto, finance, geometry, physics, statistics, temporal, trigonometry.

#### **[Warden](../libraries/warden.md)** - Cryptographic architectural governance

**Unbreakable trust through cryptography.** SHA-256 hash-locked contracts ensure every architectural change is cryptographically verified and auditable. Underscore privacy system (folder-based privacy with import validation). Graduated enforcement (Pending → Warn → Block) for smooth adoption. AI-safe development prevents drift. Zero false positives. < 5 second validation. **Workflow validation** - cryptographic contracts for visual workflow configurations. **Compliance automation** (GDPR, SOX, HIPAA, PCI-DSS) with real-time monitoring and automatic rollback on critical violations. **AI-safe workflow generation** prevents invalid/insecure configurations.

#### **[Steward](../libraries/steward.md)** - Deterministic code style enforcer

AST-based analysis and autofixes. No configuration, no debates.

### Application Layer (UI/Rendering)

#### **[Pagewright](../libraries/pagewright.md)** - Semantic HTML component library

Context-aware semantic compilation. Write `<Essay>`, `<Recipe>`, `<Dialogue>`—compiler generates correct HTML structure. Every element typed. W3C/WHATWG standards enforced at compile time. Automatic element substitution preserves user intent while ensuring standards compliance.

#### **[Architect](../libraries/architect.md)** - Reactive rendering engine

JSX → IR → JSON/YAML/Turtle → DOM (no virtual DOM). Entire application stored as data in databases. Behaviors attach as DOM properties. Data-driven forms: system auto-selects widgets based on data types, not manual widget choices.

#### **[Formulator](../libraries/formulator.md)** - Expression/formula compiler

Bidirectional formula parser. Math formulas ↔ Architect IR ↔ MathML. Perfect isomorphism (lossless transformation). **Three notation styles**: infix (standard), prefix (Polish), postfix (RPN) with seamless conversion. **Smart symbol recognition** - type `alpha` → α, `pi` → π, `integral` → ∫, `sum` → Σ. Supports 100+ mathematical symbols, Greek letters, operators, and calculus notation.

#### **[Linguist](../libraries/linguist.md)** - Internationalization as triples

Translations stored as RDF triples. Type-safe translation keys with autocomplete. ICU MessageFormat (handles Arabic's 6 plural forms). RTL support. Wraps Deno native Intl API. Zero dependencies.

#### **[Exchequer](../libraries/exchequer.md)** - Commerce primitives as data

Products, orders, payments as RDF triples. Multi-currency via Intl API. Exact decimal arithmetic (no floating-point errors). Payment provider abstraction (Stripe, PayPal, Square). Inventory management with FIFO/LIFO. Digital products and subscriptions.

### Distribution Layer (P2P/Offline/Sync)

#### **[Agent](../libraries/agent.md)** - Distributed web as JSX components

Write `<DistributedCounter>`, get P2P sync. **Complete CRDT suite** (Counter, OrSet, LwwRegister, Rga, OR-Map, graphs). No servers required. DID/VC identity. IPFS/Solid pods. **Real-time collaborative workflow editing** - multiple architects design systems simultaneously with conflict visualization, vector clocks, and automatic merging. **Multi-site collaboration** across geographic boundaries with < 200ms global sync.

#### **[Operator](../libraries/operator.md)** - Event sourcing with events as RDF triples

Events are queryable via SPARQL. Multi-layer transport escalation (DOM → BroadcastChannel → WebSocket → WebRTC → libp2p). **Homomorphic processing** - compute on encrypted events without decryption. **Event-driven workflow engine** with distributed orchestration, automatic scaling, and circuit breakers. < 1μs local latency, 1M+ events/second throughput.

#### **[Custodian](../libraries/custodian.md)** - Progressive state management

URL-as-state (complete UI state in query parameters). **Cryptographic continuations** - bookmark forms halfway through, resume weeks later. **Idempotent operations** with UUID-based exactly-once semantics. **Visual state machine designer** with real-time execution monitoring, collaborative design, and analytics. Works in Lynx (1992), enhances in modern browsers.

### Intelligence Layer (Search/Analysis/Verification)

#### **[Pathfinder](../libraries/pathfinder.md)** - Triple store infrastructure & semantic search

**The single source of truth for all triple store access.** Owns the Oxigraph (RDF) and Qdrant (vector) connections. Every library that needs to persist or query data depends on Pathfinder—ensuring single database connection, consistent transactions, zero duplication. Provides `insertTriples()`, `executeQuery()`, and SPARQL execution. **Hybrid search** - combines SPARQL's precise graph traversal with vector embeddings' semantic similarity. **Ontology inference** (RDFS/OWL reasoning makes implicit knowledge explicit). **Observability as triples** - Prometheus metrics, logs, traces become queryable knowledge. **Query-as-data** - store queries as triples, query your queries. **Oxigraph + Qdrant** architecture (production-proven, 281TB max, sub-millisecond vector search).

#### **[Envoy](../libraries/envoy.md)** - Living documentation and observability

Transforms your codebase into an intelligent, navigable knowledge graph. SPARQL-queryable. **Five-smiley developer experience tracking** (😱😟😐😊🤩) on every interaction. **Time-travel debugging** with perfect state reconstruction. **Visual debugging** - 3D code flow, computation cascade, dependency highlighting. **"Why" explanations** - trace any value back to its complete derivation history. **Brutal performance truth** - distributed benchmarking from ALL production deployments, no cherry-picked numbers. Works in Lynx (ASCII visualizations), enhances to 3D in modern browsers.

#### **[Auditor](../libraries/auditor.md)** - Mathematical verification via Z3 theorem prover

**We don't test code. We prove it correct.** Verifies properties hold for ALL inputs, not just test cases. **Z3 theorem proving** - mathematical proofs of correctness, not probabilistic testing. **Exact counterexamples** when properties fail. **Termination proofs** guarantee functions complete. **Performance bound proofs** verify Big-O claims. Produces machine-checkable proof certificates.

#### **[Arborist](../libraries/arborist.md)** - Fast AST parsing (THE ONLY parser)

**THE ONLY parser** - Warden enforces this monopoly cryptographically. Uses SWC via @swc/wasm-web. **20-50x faster** than TypeScript compiler. Syntax-level parsing only. **Violation detection** built-in (arrow functions, classes, throw, loops, mutations). All other libraries consume Arborist's structured output—no duplicate parsing, no performance waste.

### Security Layer (Auth/Testing)

#### **[Sentinel](../libraries/sentinel.md)** - Authentication and authorization as data

OAuth2, WebAuthn, DID providers. RBAC/ABAC policies in triple store.

#### **[Quarrier](../libraries/quarrier.md)** - Property-based test data generation

**Pipeline paradigm** - testing as algebraic transformation: Seed → Generate → Test → Shrink → Report. **Bidirectional generators** - generate AND parse with same logic for round-trip testing. **Proof-carrying properties** - correctness guarantees without HKT ceremony. **Metamorphic testing** - properties derive other properties automatically. **Effects as values** (not IO monads). **Lazy shrink trees from day one** - efficient minimal counterexamples immediately. Zero dependencies.

### Tooling Layer (Developer Tools)

#### **[Quartermaster](../libraries/quartermaster.md)** - Application generator

**Voice-first interface** - describe apps naturally, AI guides configuration. **Sketch-to-app** - upload wireframes, get working applications. **Real-time collaborative blueprint editing** via Agent CRDTs. **HTTPS dev server with mkcert** - production-quality from day one (ports: 25144/bend, 31415/π, 27182/e, 16180/φ). **Time-travel configuration** - complete audit trail, branch alternatives, replay decisions. **Blueprint marketplace** with cryptographic signing and community ratings. **18+ specialized templates** (blog, dashboard, e-commerce, workflow-designer, automation-platform, etc.).

## Core Principles

### 1. Declarative Everything

```tsx
// This is a distributed counter with validation and persistence
<DistributedCounter id="votes">
  <Validation min={0} max={1000000} />
  <SyncWithPeers />
  <PersistToTripleStore />
</DistributedCounter>
```

One declaration generates client validation, server validation, CRDT synchronization, persistence layer, conflict resolution, and performance metrics.

### 2. No Escape Hatches

- **No classes** - Pure functions only
- **No mutations** - Immutable data only
- **No loops** - Functional methods only (map, filter, reduce)
- **No barrels** - Direct imports only
- **No legacy** - Greenfield only

### 3. Single Source of Truth

Data concepts defined once drive everything:

```tsx
<Concept name="EmailAddress">
  <Shape>
    <And>
      <IsString />
      <IsMatching pattern="/.+@.+/" />
      <MinLength>5</MinLength>
      <MaxLength>150</MaxLength>
    </And>
  </Shape>
</Concept>
```

This automatically provides:
- Client-side validation (from Shape)
- Server-side validation (same Shape rules)
- Database constraints (generated from Shape)
- Form field selection (EmailField component)
- SHACL ontology rules (compiled from Shape)
- Property-based test generation (by Auditor)

### 4. Cryptographic Governance

Warden provides **unbreakable trust** through cryptographic enforcement:

**SHA-256 Hash-Locked Contracts:**
- Every architectural decision cryptographically verified
- Complete audit trail of all changes
- Zero trust architecture - no assumptions, only cryptographic proof
- Contracts cannot be bypassed or tampered with

**Enforcement Capabilities:**
- Import boundaries validated (no barrel files, direct tree imports only)
- Privacy enforced (underscore folders are private, import validation prevents access)
- Dependencies whitelisted (zero unapproved runtime deps, see contracts/dependencies.yaml)
- AI-safe development (prevents AI-induced architectural drift)
- Graduated enforcement (Pending → Warn → Block for smooth adoption)
- Zero false positives (100% accuracy in violation detection)
- Sub-5-second validation (maintains development velocity)

**Compliance & Security:**
- Automated compliance checking (GDPR, SOX, HIPAA, PCI-DSS)
- Real-time monitoring of architectural violations
- Automatic rollback on critical violations
- Workflow governance (validates visual workflow configurations)

### 5. Mathematical Correctness

Auditor generates formal proofs:
- Property verification via Z3 theorem prover
- Contract verification (mathematical proofs of invariants)
- Termination proofs
- Performance bound proofs (Big-O verification)

## Key Innovations

### Z3 Theorem Proving for Mathematical Correctness

Auditor doesn't test code—it **proves it correct** using the Z3 theorem prover:

```tsx
<PropertyTest name="EmailValidation">
  <ForAll concept="EmailAddress">
    <Property>
      <Contains char="@" />
      <IsLength min={5} />
    </Property>
  </ForAll>
</PropertyTest>
```

**Revolutionary capabilities:**
- **Proves for ALL inputs** - Not just test cases, but mathematical certainty
- **Exact counterexamples** - When properties fail, get precise failing inputs
- **Termination proofs** - Guarantee functions complete
- **Performance bound proofs** - Verify Big-O claims mathematically
- **Machine-checkable certificates** - Proofs can be independently verified

This eliminates entire categories of bugs through mathematical certainty rather than probabilistic testing.

### Codebase as Living Knowledge Graph

Envoy transforms your entire codebase into a queryable knowledge graph stored as RDF triples:

```sparql
# Find all functions with high complexity
SELECT ?function ?complexity WHERE {
  ?function env:hasComplexity ?complexity .
  FILTER(?complexity > 15)
}

# Find all security issues by age
SELECT ?issue ?age WHERE {
  ?issue env:hasCategory "SECURITY" ;
         env:hasAge ?age .
} ORDER BY DESC(?age)
```

This enables:
- **SPARQL queries** over your entire codebase
- **Semantic navigation** through HATEOAS links
- **Automatic documentation** generated from code structure
- **Real-time metrics** on code quality, team velocity, developer happiness
- **Five-smiley feedback** (😱😟😐😊🤩) on every interaction
- **Project intelligence dashboard** showing system health

### Three Notation Styles for Maximum Flexibility

Formulator **automatically detects** infix, prefix (Polish), and postfix (RPN) notation:

```typescript
// Same formula, three notations (auto-detected):
parseFormula("(a + b) * c")(vars)    // Infix (standard)
parseFormula("* + a b c")(vars)      // Prefix (Polish) - auto-detected
parseFormula("a b + c *")(vars)      // Postfix (RPN) - auto-detected

// Seamless conversion between notations:
const infix = decompile(ir)          // "(a + b) * c"
const postfix = decompileToPostfix(ir)  // "a b + c *"
const prefix = decompileToPrefix(ir)    // "* + a b c"
```

**Smart symbol recognition** - type `alpha` → α, `integral` → ∫, `sum` → Σ. Supports 100+ mathematical symbols.

### Auto-Generated Forms from Ontology

```tsx
<Form concept="Person" type="create" enhance="validate" />
```

This single line:
1. Queries triple store for Person concept definition
2. Extracts all properties and their shapes
3. Auto-selects appropriate field components
4. Applies progressive enhancement
5. Handles form submission and persistence

### Context-Aware Semantic Compilation

Pagewright's compiler analyzes your component tree to determine correct HTML structure. Write semantic meaning, get correct markup:

```tsx
<Article>
  <Heading>
    <Title>Why Sitebender Rocks</Title>
  </Heading>
  <Section>
    <Heading>
      <Title>Because It Does</Title>
    </Heading>
  </Section>
</Article>

// Compiles to:
<article>
  <header>
    <h1>Why Sitebender Rocks</h1>  // h1 in article heading
  </header>
  <section>
    <h2>Because It Does</h2>  // h2 in nested section
  </section>
</article>
```

The same `<Title>` component becomes `<h1>` or `<h2>` depending on nesting depth. Context determines structure.

### Automatic Element Substitution

Pagewright automatically substitutes invalid HTML with standards-compliant alternatives while preserving all data. Never blame the user—if something is confusing, that's the framework's responsibility to guide kindly.

```tsx
// User writes invalid markup
<div onclick="alert('click')" badattr="preserved">
  <span>Content always preserved</span>
</div>

// System renders with corrections
<Div data-x-onclick="alert('click')" data-x-badattr="preserved">
  <Span>Content always preserved</Span>
</Div>
```

### Events as Queryable Triples

Operator stores all events as RDF triples, making your entire event history queryable:

```sparql
# Find all high-latency events in the last hour
SELECT ?event ?transport ?latency WHERE {
  ?event op:transport ?transport ;
         op:latency_p99 ?latency ;
         op:timestamp ?time .
  FILTER(?time > NOW() - "PT1H"^^xsd:duration)
  FILTER(?latency > 10)
}
```

Multi-layer transport escalation automatically selects optimal delivery: DOM events (< 1μs) → BroadcastChannel (< 1ms) → WebSocket (< 10ms) → WebRTC → libp2p (< 100ms global). **Event-driven workflow engine** with distributed orchestration, automatic scaling, and 1M+ events/second throughput. Homomorphic processing enables computation on encrypted events without decryption.

### URL-as-State & Cryptographic Continuations

Custodian encodes complete UI state in URLs—shareable, bookmarkable, resumable:

```
/dashboard?accordion=2&tab=settings&sort=date&order=asc&page=3#row-42
```

Multi-step workflows use **cryptographically signed continuation tokens**. Bookmark a form halfway through, resume weeks later. The continuation is the computation frozen in time. **Visual state machine designer** enables collaborative workflow design with real-time execution monitoring. **Idempotent operations** with UUID-based exactly-once semantics prevent duplicates. Works in Lynx (1992), enhances in modern browsers.

### Data-Driven Forms

Forms are about data types, not widgets. The system auto-selects appropriate widgets:

```tsx
// Traditional: manually pick widgets
<RadioGroup name="role" />
<Checkbox name="active" />

// Sitebender: describe data, system picks widgets
<ChooseOneField name="role" type="String" />  // → radio OR select
<BooleanField name="active" />  // → checkbox OR toggle
```

Widget selection based on data characteristics:
- `ChooseOneField` with ≤6 options → radio buttons
- `ChooseOneField` with >6 options → select dropdown
- `TextField` configured for short text → input
- `TextField` configured for long text → textarea

Non-developers can build forms once the data model exists. The system knows how to collect data types.

### Distributed by Default

Agent provides CRDT components for conflict-free distributed state:

```tsx
<DistributedCounter id="votes" />
<OrSet id="participants" />
<LWWRegister id="status" />
<Rga id="collaborative-text" />
```

No servers required. P2P networking via libp2p. Offline-first. Real-time collaboration built-in.

### Time-Travel Debugging & Visual Intelligence

Envoy provides unprecedented debugging capabilities:

**Time-Travel Debugging:**
- Perfect state reconstruction from immutable triple store
- Step forward/backward through any execution
- Diff visualization between states
- Causality tracking - follow event chains
- Branch exploration - try different execution paths

**Visual Debugging:**
- 3D code flow visualization in real-time
- Computation cascade through DOM
- Dependency highlighting on click
- Hot path analysis
- Memory topology graphs

**"Why" Explanations:**
```
Q: Why did #totalPrice show $127.50?
A: Because:
   1. #quantity (3) × #price ($39.00) = $117.00
   2. #taxRate (8.5%) applied = $9.95
   3. #shipping ($0.55) added = $127.50
```

Every value knows its complete derivation history. Natural language explanations of complex behaviors.

### Homomorphic Event Processing

Operator enables **computation on encrypted events without decryption**:

```tsx
<Subscribes to="salary:updated">
  <HomomorphicSum
    compute="average"
    without="decrypting"
    reveal="only-to-authorized"
  />
</Subscribes>
```

Privacy-preserving analytics. Differential privacy. Zero-knowledge proofs. Ring signatures for anonymous publishing.

### Hybrid Search: Graph + Vector

Pathfinder combines SPARQL's precision with vector embeddings' semantic understanding:

```typescript
const results = await hybridSearch({
  sparql: `SELECT ?component WHERE { ?component rdf:type pagewright:Component }`,
  vector: { query: "accessible form inputs", topK: 10 },
  combine: "rerank"
})
```

**Query-as-data** - store queries as triples, query your queries. **Observability as triples** - Prometheus metrics become queryable knowledge via SPARQL.

### Voice-First Application Generation

Quartermaster democratizes development through **conversational app generation**:

```bash
qm new --voice

You: "I want to build a blog"
AI: "Great! Should comments update in real-time?"
You: "Yes"
AI: "Adding Operator for real-time events. Generating..."
```

**Sketch-to-app** - upload wireframes, get working applications. **Time-travel configuration** - complete audit trail of every decision. **Blueprint marketplace** with cryptographic signing. **HTTPS dev server** from day one (mkcert integration, ports: 25144/bend, 31415/π, 27182/e, 16180/φ).

### Pipeline-Based Property Testing

Quarrier treats testing as **algebraic pipeline composition**:

```typescript
const pipeline = pipe(
  map((x) => x * 2),
  filter((x) => x > 0),
  shrinkToward(0)
)
```

**Bidirectional generators** - generate AND parse with same logic. **Proof-carrying properties** - correctness guarantees built-in. **Metamorphic testing** - properties derive other properties automatically. **Effects as values** (not IO monads). **Lazy shrink trees from day one** - minimal counterexamples immediately.

### Zero-Knowledge Workflow Authentication

Sentinel enables **privacy-preserving authentication** for workflows:

```tsx
<ProofOfRole without="revealing-identity">
  <Prove property="has-admin-role" />
  <Prove property="clearance-level >= confidential" />
  <Without revealing={["name", "employee-id", "department"]} />
</ProofOfRole>
```

Multi-factor workflow auth with adaptive risk assessment. Emergency override protocols with cryptographic audit trails. Compliance automation (SOX, PCI-DSS, GDPR, HIPAA).

### Cryptographic Continuations

Custodian's **signed continuation tokens** enable resumable workflows:

```typescript
type WizardContinuation = {
  step: number
  data: Record<string, unknown>
  remaining: Array<number>
  rollback: string
  expires: number
  nonce: string
  signature: string  // Tamper-proof
}
```

Bookmark a multi-step form halfway through. Resume weeks later. The continuation is the computation frozen in time, cryptographically verified.

## Development Philosophy

### "The Future Doesn't Need the Past's Mistakes"

Sitebender is **not** competing with React, Vue, or Angular. They're already obsolete. We're building what comes after—when applications are data, distribution is free, and correctness is guaranteed.

### Core Tenets

- **NO MIGRATIONS** - Throw your legacy code away
- **NO LEGACY SUPPORT** - The future doesn't need the past
- **NO TECH DEBT** - Do it right the first time
- **NO COMPROMISES** - Pure functional, immutable, declarative
- **NO BACKWARDS COMPATIBILITY** - Move forward only

### Who Should Leave Now

If you want to:
- Migrate your legacy React app
- Use classes or mutations
- Maintain backwards compatibility
- Support enterprise legacy requirements
- Tolerate technical debt

**Leave now.** Sitebender is not for you.

### Who Should Stay

If you want to:
- Build the future of web development
- Work with pure functional programming
- Embrace mathematical correctness
- Create distributed applications
- Never write imperative code again

**Welcome home.**

## Quick Links

- **[Libraries Reference](./libraries.md)** - Detailed reference for all 18 libraries
- **[DSL Specification](./dsl-specification.md)** - Complete JSX DSL specification
- **[Data Model](./data-model.md)** - RDF triple store and ontology details
- **[Testing Strategy](../implementation/testing-strategy.md)** - How to test Sitebender applications
- **[Getting Started](../implementation/development-workflow.md)** - Start building with Sitebender

---

**Built with zero dependencies. Tested with mathematical proofs. Deployed everywhere. This is Sitebender Studio.**
