# Studio Libraries - Complete Reference

**Context:** Pre-alpha web framework. Everything is data. JSX → IR → Triples → DOM. Zero dependencies except where approved. Warden enforces all boundaries cryptographically.

---

## Foundation Layer (Infrastructure)

**Toolsmith** - Pure functional programming primitives
- Monads, functors, applicatives with mathematical laws
- Lifted array/object/string operations
- Zero dependencies, zero mutations
- Every function proven correct
- Status: Active development, must complete and lock

**Warden** - Cryptographic architectural governance
- SHA-256 hash-locked contracts enforce architecture
- Import boundary validation (no barrel files, direct tree imports only)
- Privacy enforcement (underscore folders are private)
- AI-safe development (prevents drift)
- Status: Highest priority, must be foolproof

**Steward** - Deterministic code style enforcer
- AST-based analysis and autofixes
- No configuration, no debates
- Runs < 3 seconds repo-wide
- Normalizes code before Warden checks
- Status: Alpha (spec + stubs)

---

## Application Layer (UI/Rendering)

**Pagewright** - Semantic HTML component library
- Every HTML/SVG/MathML element typed (ChemML removed)
- W3C/WHATWG standards enforced at compile time
- Accessibility built into every component
- Progressive enhancement (works in Lynx, enhanced in Chrome)
- Status: Advanced (more complete than typical alpha)

**Architect** - Reactive rendering engine
- JSX → IR → JSON/YAML/Turtle → DOM (no virtual DOM)
- Behaviors attach as DOM properties (`__sbCalculate`, `__sbValidate`, `__sbFormat`)
- Calculations cascade automatically through reactive graph
- Direct DOM manipulation, no diffing
- Status: Advanced (more complete than typical alpha)

**Formulator** - Expression/formula compiler
- Math formulas ↔ Architect IR (bidirectional)
- Perfect isomorphism (lossless transformation)
- MathML generation (ChemML removed)
- Proper operator precedence, variables, functions
- Status: Independent, can proceed in parallel

---

## Distribution Layer (P2P/Offline/Sync)

**Agent** - Distributed web as JSX components
- CRDT components (counter, LWW, OR-set, RGA)
- P2P networking via libp2p (no servers)
- DID/VC identity management
- IPFS/Solid pod persistence
- Conflict visualization components
- Many dependencies allowed (libp2p, IPFS, crypto - see contracts/dependencies.yaml)
- Status: Independent, can proceed in parallel

**Operator** - CQRS event sourcing with events as RDF triples
- Events stored as triples, queryable via SPARQL
- CQRS pattern: commands produce events, queries are nullipotent
- Cryptographic ordering: hash chains + vector clocks (no blockchain)
- Multi-layer transport escalation (DOM → BroadcastChannel → WebSocket → WebRTC → libp2p)
- Event-driven workflow orchestration (visual n8n-style designer)
- Homomorphic processing (compute on encrypted events)
- Perfect replay and time-travel from immutable event log
- Status: Independent, can proceed in parallel

**Custodian** - Progressive state management
- Works without JavaScript, enhances with it (Lynx to modern browsers)
- URL-as-state: complete UI state in query parameters
- Cryptographic continuations for resumable multi-step workflows
- Visual state machine designer (n8n-style, integrates with Operator)
- Generator-based state machines (memory-efficient)
- State Monad for pure functional state threading
- Event sourcing integration: state derived from Operator events via Pathfinder queries
- Form-based mutations with idempotent operations
- Status: Independent, can proceed in parallel

---

## Intelligence Layer (Search/Analysis/Verification)

**Pathfinder** - Data discovery, semantic search, ontology inference (NEW)
- SPARQL query building and optimization (type-safe, composable)
- Vector similarity search via Qdrant (hybrid graph + vector)
- Ontology inference (RDFS/OWL reasoning makes implicit knowledge explicit)
- Observability indexing (Prometheus metrics, logs, traces → searchable triples)
- Hybrid search (combine SPARQL precision with vector semantic ranking)
- Low-level query execution (Agent handles distribution/federation)
- Triple store: Oxigraph (embeddable, SPARQL 1.1, production-ready)
- Distribution: Turso (distributed SQLite with edge replicas, zero API changes)
- Dependencies: oxigraph, @qdrant/qdrant-js, prom-client (see contracts/dependencies.yaml)
- Status: Planning phase (depends on Warden enforcement first)

**Envoy** - Living documentation and observability platform
- Code becomes knowledge graph (triples)
- SPARQL queries over codebase
- Five-smiley developer experience tracking (😱😟😐😊🤩)
- Performance aggregation from production (no synthetic benchmarks)
- Visual workflow dashboard (n8n-style powered by semantic triple store)
- Comment syntax: `//++` ONLY (descriptions, use sparingly - automation preferred)
- Automated capabilities: Quarrier generates examples, Auditor finds gotchas, Envoy analyzes pros/cons
- Manual comments ONLY for: business context, design rationale, critical issues, external links, tech debt plans
- Visualizes observability data indexed by Pathfinder
- Status: Dependent on Quarrier + Arborist readiness

**Auditor** - Mathematical verification via Z3 theorem prover
- Formal verification (proves correctness, doesn't just test)
- Property-based test generation (via Quarrier)
- Contract verification (mathematical proofs of invariants)
- Coverage analysis with proofs
- SMT solving for property verification
- Counterexample generation for failures
- Performance bound proofs (Big-O verification)
- Termination proofs
- Dependencies: z3-solver (see contracts/dependencies.yaml)
- Status: Dependent on Quarrier + Arborist readiness

**Arborist** - Fast AST parsing (THE ONLY library allowed to parse)
- Uses @swc/wasm-web (SWC compiled to WASM, changed from deno_ast)
- 20-50x performance improvement over TypeScript compiler
- Syntax-level analysis for all tools
- Warden enforces: NO OTHER LIBRARY MAY PARSE (all consume Arborist output)
- Future: optional semantic analysis
- Dependencies: npm:@swc/wasm-web (ONLY parsing dependency allowed)
- Status: Independent, can proceed in parallel

---

## Security Layer (Auth/Testing)

**Sentinel** - Authentication and authorization as declarative data
- OAuth2, WebAuthn, DID providers
- RBAC/ABAC policies stored in triple store (via Pathfinder)
- Formally verifiable security
- Declarative test authentication (not mocks - real test credentials as data)
- Lock system definitions: `<Locked>`, `<Key>`, `<And>`, `<Or>` components
- Warden enforces lock contracts
- Dependencies: @noble/ciphers (encryption), @web5/dids (see contracts/dependencies.yaml)
- Status: Planning phase

**Quarrier** - Property-based test data generation
- QuickCheck-style generators (bidirectional: generate AND parse)
- Pipeline paradigm: Seed → Generate → Test → Shrink → Report
- Proof-carrying properties (formal correctness proofs)
- Metamorphic testing (properties derive other properties)
- Resumable shrinking (pause/resume across sessions)
- Effects as values (data describing computations, not IO monads)
- Respects SHACL/OWL constraints when generating triples
- Provides ALL test data to Auditor (Warden enforced)
- CRDT-aware (< 10ms merge performance target)
- Status: Independent, can proceed in parallel

---

## Tooling Layer (Developer Tools)

**Quartermaster** - Voice-guided application generator
- Voice-first interface for conversational app generation
- HTTPS dev server with mkcert (production-quality from day one)
- Real-time collaborative blueprint editing (via Agent CRDTs)
- Visual configuration wizard (web-based, works in any browser)
- Sketch-to-app: upload wireframes, generate working applications
- 18+ blueprint templates (minimal, blog, dashboard, e-commerce, etc.)
- Time-travel configuration history (every decision tracked)
- Blueprint marketplace with cryptographic signing
- Import map generation, Warden/Steward pre-wired
- Math constant ports (31415=π, 27182=e, 16180=φ)
- Status: Alpha (spec + stubs)

---

## Key Architectural Rules

### Dependencies
- Zero runtime dependencies (except approved exceptions in contracts/dependencies.yaml)
- Warden cryptographically enforces whitelist
- **NO UNAPPROVED LIBRARIES - architect (human) approval required first**
- Application code unrestricted, governance is for libraries only

### Parsing Monopoly
- Arborist is THE ONLY library allowed to parse (Warden enforced)
- Envoy, Auditor, all others consume Arborist's structured output
- Violation = cryptographic contract failure

### Test Data
- Quarrier provides ALL test data to Auditor (Warden enforced)
- NO MOCKING except MSW-style IO edge interception (HTTP, filesystem, network)
- Test with real implementations and declarative scenario data

### Comments
- `//++` ONLY required comment (descriptions, use sparingly)
- Other markers (`//??`, `//--`, `//!!`, `//>>`) optional until Envoy automation ready
- Pre-alpha: NO LEGACY BLOAT, NO ANTICIPATORY CODE

### Code Structure
- One function per file
- Named functions only, export on same line
- Direct tree imports only, NO barrel files
- Underscore folders are private (cryptographically enforced)

### Philosophy
- "The future doesn't need the past's mistakes"
- NO MIGRATIONS, NO LEGACY SUPPORT, NO TECH DEBT
- DO IT RIGHT THE FIRST TIME
- Pre-alpha: specs evolve, no anticipatory implementation

---

**Total: 16 libraries** across 6 layers. Everything compiles to RDF triples. Everything is queryable. Everything is data.
