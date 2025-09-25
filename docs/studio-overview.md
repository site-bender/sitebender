# Studio Architecture Overview

> **Everything is data. Everything is declarative. Everything works.**

## What Studio Is

Studio is a complete web framework where applications are data, behaviors are declarative, and distribution is fundamental. Write JSX components, get a distributed application with validation, persistence, offline support, and real-time collaboration. No servers required. No build steps. No compromises.

The entire system runs on Deno + TypeScript with zero runtime dependencies (except Arborist's SWC parser). Every library follows strict functional programming. Every component is accessible. Every behavior is measured.

## Core Architecture

### The Data Flow

```
JSX → Internal Representation → Triple Store → SPARQL Queries → DOM
                                      ↓
                                Distributed CRDTs
                                      ↓
                                 P2P Network
```

Applications compile to RDF triples stored in a semantic triple store. Every state change, every event, every test result becomes queryable data. Time-travel debugging and perfect replay come free.

### Runtime Pipeline

**Architect** renders directly to DOM without virtual DOM overhead:

1. `buildDomTree(parent)(config)(options)` creates elements
2. Behaviors attach as DOM properties (`__sbCalculate`, `__sbValidate`, `__sbFormat`)
3. Events dispatch natively, cascade through reactive graph
4. Changes persist to triple store automatically
5. CRDTs sync across peers without conflicts

Global registries track dependencies:

- `document.__sbCalculators` - Elements with calculations
- `document.__sbValidations` - Elements with validation
- `document.__sbFormatters` - Elements with formatting
- `document.__sbEventLog` - Complete event history for replay

## The Libraries

### Foundation Layer

**Toolsmith** - Pure functional programming primitives

- Monads, functors, applicatives with mathematical laws
- Lifted array/object/string operations
- Zero dependencies, zero mutations
- Every function proven correct

**Warden** - Cryptographic architectural governance

- SHA-256 hash-locked contracts
- Import boundary enforcement
- Privacy validation (underscore folders)
- AI-safe development (no drift possible)

**Steward** - Deterministic code style

- AST-based analysis and fixes
- No configuration, no debates
- Runs in < 3 seconds repo-wide
- Normalizes code before Warden checks

### Application Layer

**Pagewright** - Semantic HTML components

- Every HTML/SVG/MathML/ChemML element typed
- W3C/WHATWG standards enforced at compile time
- Accessibility built into every component
- Progressive enhancement by default

**Architect** - Reactive rendering engine

- JSX → IR → JSON/YAML/Turtle → DOM
- Behaviors compose functionally
- Calculations cascade automatically
- No virtual DOM, no diffing

**Formulator** - Expression compilation

- Math/chemical formulas ↔ Architect IR
- Bidirectional transformation
- MathML/ChemML generation
- Perfect isomorphism

### Distribution Layer

**Agent** - The distributed web as JSX

- CRDT components (counter, LWW, OR-set, RGA)
- P2P networking without servers
- DID/VC identity management
- IPFS/Solid pod persistence
- Conflict visualization components

**Operator** - Event system as triples

- Events stored as RDF triples
- Multi-layer transport (local/broadcast/network/distributed)
- Homomorphic processing (compute on encrypted events)
- Perfect replay from event log

**Custodian** - State management

- Continuation-based state machines
- URL-as-state philosophy
- Form-based mutations
- Time-travel debugging

### Intelligence Layer

**Envoy** - Living documentation

- Code becomes knowledge graph
- SPARQL queries over codebase
- Five-smiley developer experience (😱😟😐😊🤩)
- Performance aggregation from production
- Comment markers: `//++`, `//??`, `//--`, `//!!`, `//>>`

**Auditor** - Mathematical verification

- Z3 theorem prover integration
- Property-based test generation
- Contract verification
- Coverage analysis with proofs

**Arborist** - Fast AST parsing

- SWC via deno_ast (50x faster than TypeScript)
- Syntax-level analysis for all tools
- The ONLY library with external dependency
- Future: optional semantic analysis

### Security Layer

**Sentinel** - Authentication as data

- OAuth2, WebAuthn, DID providers
- RBAC/ABAC policies in triple store
- Formally verifiable security
- Mock authentication for testing

**Quarrier** - Test data generation

- Property-based testing
- QuickCheck-style generators
- SHACL/OWL constraint respect
- Triple generation for tests

### Tooling Layer

**Quartermaster** - Application scaffolding

- 18 blueprint templates
- Import map generation
- Warden/Steward pre-wired
- Zero configuration

## Declarative Testing

Testing is data, not code. Test scenarios are JSX components:

```tsx
<TestScenario name="Distributed CRDT convergence">
  <Actors count={3}>
    <NetworkPartition between={[0, 1]} duration={100} />
  </Actors>

  <Operations>
    <Increment actor={0} target="#counter" />
    <Increment actor={1} target="#counter" />
    <Increment actor={2} target="#counter" />
  </Operations>

  <AssertEventually>
    <AllActors see={3} in="#counter" />
  </AssertEventually>
</TestScenario>
```

Tests:

- Store in triple store
- Query via SPARQL
- Replay infinitely
- Debug with time-travel

## Development Constraints

### Enforced by Warden

**Structure**

- One function per file
- Named functions only
- Export on declaration line
- Direct tree imports only
- No barrel files ever

**Privacy**

- Underscore folders are private
- No cross-boundary imports
- No escape hatches
- Cryptographically verified

**Quality**

- 100% test coverage (reported)
- Zero lint/type errors
- Accessibility enforced
- Performance measured

### Enforcement Pipeline

```
Steward (normalize) → deno fmt → Warden (verify) → Tests (prove)
```

Violations warn in PRs, block on main. No exceptions.

## Data Model

### Single Source of Truth

The triple store contains everything:

- Application data (user content)
- Application structure (UI definitions)
- Event history (perfect replay)
- Test scenarios (reproducible)
- Performance metrics (production data)

### Semantic Validation

- SHACL shapes define constraints
- OWL2 ontologies provide reasoning
- Validation identical everywhere (client/server/database)
- Constraints generate automatically from data types

## Applications

### mission-control

Envoy-generated documentation with live examples, performance dashboards, and test results. The central command center for your Studio applications.

### the-workshop

Interactive development environment with:

- JSX → IR visualization
- CRDT conflict playground
- Calculation cascade debugger
- Event flow visualizer

### the-agency

Experimental distributed features:

- IPFS content addressing
- Solid pod integration
- Blockchain anchoring
- P2P networking demos

## Performance Philosophy

### Brutal Honesty

No cherry-picked benchmarks. Only production metrics:

```sparql
SELECT ?function ?p99_latency ?throughput
WHERE {
  ?function measured_in "production" ;
           p99_latency ?p99_latency ;
           throughput ?throughput .
}
ORDER BY DESC(?p99_latency)
```

Every operation instrumented. Every metric stored. Every regression detected.

### Baseline Targets

- Local events: < 1μs latency
- DOM updates: < 16ms (60fps)
- Network sync: < 100ms
- CRDT merge: < 1ms
- Triple query: < 10ms

## Who This Is For

### Primary Users

- **AI Assistants** - Declarative patterns prevent errors
- **Designers** - Build complete apps with JSX
- **Data Scientists** - Work with semantic triples
- **Hobbyists** - Create powerful apps simply

### Explicitly NOT For

- Teams migrating from React/Vue/Angular
- Enterprises with legacy requirements
- Developers who like classes
- Anyone who tolerates technical debt

## Getting Started

```bash
# Install Deno
curl -fsSL https://deno.land/install.sh | sh

# Generate an application
deno run -A quartermaster new my-app --template dashboard

# Start developing
cd my-app && deno task dev
```

## The Revolution

Studio represents a fundamental paradigm shift:

1. **Applications ARE data** - Not code with data
2. **Distribution IS fundamental** - Not bolted on
3. **Testing IS declarative** - Not imperative
4. **Documentation IS generated** - Not maintained
5. **Governance IS cryptographic** - Not suggested

## Current Status

All libraries are functionally complete and actively used. The system is production-ready for greenfield projects. Every component has:

- ✅ Full implementation
- ✅ 100% test coverage
- ✅ Warden verification
- ✅ Performance measurement
- ✅ Accessibility enforcement

## The Future

Studio is building toward:

- **Computation marketplace** - Trade verified behaviors
- **Formal verification** - Prove entire applications correct
- **Neural optimization** - AI-optimized event routing
- **Homomorphic everything** - Compute without decryption
- **Distributed by default** - No servers, ever

But these aren't promises. The current system already delivers on the core vision: **Applications as data, distributed by default, formally verifiable.**

## Philosophy

**"The future doesn't need the past's mistakes."**

No migrations. No legacy support. No backwards compatibility. Just a clean, correct, revolutionary approach to building web applications.

If you're looking to migrate your React app, this isn't for you. If you're ready to build the future, welcome to Studio.

---

_Zero dependencies. Mathematical proofs. Distributed by default. This is how applications should be built._
