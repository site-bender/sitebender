# @sitebender/studio

**The future of web development. No migrations. No compromises. No legacy.**

## What Studio Is

Studio is a revolutionary framework where **everything is data**. Write declarative JSX components. Get a complete application with validation, persistence, distribution, offline support, real-time collaboration, and reactive updates. No servers required. No build steps. No virtual DOM overhead.

Applications compile to data (JSON/YAML/Turtle), persist in triple stores, query via SPARQL, and render directly to DOM with attached behaviors. Every interaction is measured. Every behavior is declarative. Every test is data.

## What Studio Is NOT

- ❌ NOT a React alternative (React is already obsolete)
- ❌ NOT a migration path (throw your legacy code away)
- ❌ NOT for enterprise (we don't do technical debt)
- ❌ NOT backwards compatible (the future doesn't need the past)
- ❌ NOT another VDOM framework (we render directly to DOM)

## Who Studio Is For

### Primary Audience

- **AI Assistants** building applications through declarative patterns
- **Designers** creating complete apps without imperative code
- **Data Scientists** working with semantic triple stores
- **Hobbyists** who want powerful apps without complexity

### NOT For

- React developers clinging to 2013 patterns
- Enterprises with "legacy migration requirements"
- Anyone who thinks classes are good
- Teams that tolerate technical debt

## Revolutionary Architecture

### Everything Is Data

```
JSX → Internal Representation → Triple Store → Distributed CRDTs → DOM
```

Your entire application—including all behaviors, validations, and tests—exists as queryable RDF triples. Time-travel debugging is free. Perfect replay is automatic. Distribution is built-in.

### The Libraries

#### Core Foundation

- **Toolsmith** - Pure functional programming primitives. Zero dependencies. Mathematical laws.
- **Warden** - Cryptographic governance. Enforces architecture. Prevents drift. AI-safe.
- **Steward** - Deterministic code style. No debates. No config. Just correctness.

#### Application Layer

- **Pagewright** - Semantic HTML components. Every element typed. Accessibility enforced.
- **Architect** - Reactive rendering without VDOM. Behaviors attached as DOM properties.
- **Formulator** - Bidirectional formula parser. Math ↔ IR ↔ MathML. Perfect isomorphism.
- **Linguist** - Internationalization as triples. Type-safe translations. ICU MessageFormat.
- **Exchequer** - Commerce primitives as data. Products, orders, payments. Multi-currency.

#### Distribution Layer

- **Agent** - Distributed web as JSX. CRDTs, DIDs, IPFS, Solid pods. No servers.
- **Operator** - Events as triples. Multi-transport (local/broadcast/network/distributed).
- **Custodian** - Continuation-based state. Time-travel debugging. Perfect replay.

#### Intelligence Layer

- **Pathfinder** - **Triple store infrastructure**. Owns Oxigraph connection. SPARQL execution. Vector search. All libraries depend on Pathfinder for data persistence.
- **Envoy** - Living documentation. Code intelligence. Five-smiley developer experience.
- **Auditor** - Mathematical proof generation. Property testing. 100% coverage.
- **Arborist** - SWC-powered parsing. 20-50x faster than TypeScript compiler.

#### Security Layer

- **Sentinel** - Authentication as data. Policies in triple store. Formally verifiable.
- **Quarrier** - Property-based test generation. Respects all constraints.

#### Tooling Layer

- **Quartermaster** - Application scaffolding. 18 templates. Zero configuration.

## Core Principles

### Declarative Everything

```tsx
// This is a distributed counter with validation and persistence
<DistributedCounter id="votes">
  <Validation min={0} max={1000000} />
  <SyncWith.Peers />
  <PersistTo.TripleStore />
</DistributedCounter>
```

One declaration generates:

- Client validation
- Server validation
- CRDT synchronization
- Persistence layer
- Conflict resolution
- Performance metrics

### No Escape Hatches

- **No classes** - Pure functions only
- **No mutations** - Immutable data only
- **No loops** - Functional methods only
- **No barrels** - Direct imports only
- **No legacy** - Greenfield only

### Brutal Honesty

- Performance metrics from **production**, not benchmarks
- Test coverage that's **real**, not gamed
- Documentation that's **generated**, not written
- Errors that **help**, not confuse

## Getting Started

```bash
# Install Deno (the only dependency)
curl -fsSL https://deno.land/install.sh | sh

# Clone Studio
git clone https://github.com/sitebender/studio.git

# Generate an app (18 templates available)
deno run -A quartermaster new my-app --template blog

# Start developing
cd my-app && deno task dev
```

## Example: Complete Application

```tsx
// This is a COMPLETE collaborative todo app
function TodoApp() {
  return (
    <DistributedApp>
      <Identity>
        <DidKey />
      </Identity>

      <DistributedState id="todos">
        <OrSet>
          <TodoItem>
            <Field name="title" type="LWWRegister" />
            <Field name="completed" type="LWWRegister" />
          </TodoItem>
        </OrSet>
      </DistributedState>

      <TodoList>
        <RenderEach from="#todos">
          {(todo) => (
            <Todo>
              <Checkbox bound={todo.completed} />
              <Text bound={todo.title} />
            </Todo>
          )}
        </RenderEach>
      </TodoList>

      <AutoSync every={1000}>
        <With.AllPeers />
      </AutoSync>
    </DistributedApp>
  );
}
```

This creates:

- P2P synchronization
- Offline support
- Conflict-free updates
- Automatic persistence
- Real-time collaboration
- Zero server required

## Testing Is Data

```tsx
<TestScenario name="Distributed convergence">
  <Actors count={3} partition={true} />
  <SimulateOperations random={true} count={100} />
  <AssertEventually>
    <AllNodesConverge />
  </AssertEventually>
</TestScenario>
```

Tests are:

- Stored in triple store
- Perfectly replayable
- Time-travel debuggable
- Formally verifiable

## Development Rules

### Enforced by Warden

- ✅ One function per file
- ✅ Direct tree imports only
- ✅ Underscore = private
- ✅ Named functions only
- ✅ Export on declaration line

### Violations Are Blocked

```bash
deno task enforce  # Cryptographic verification
deno task test     # 100% coverage required
deno task audit    # Property proofs generated
```

## Performance Truth

No marketing benchmarks. Only production reality:

```sparql
SELECT ?function ?p99_latency ?memory
WHERE {
  ?function env:measuredIn "production" ;
           env:p99_latency ?p99_latency ;
           env:memory_usage ?memory .
  FILTER(?p99_latency > 16ms)
}
```

Every operation measured. Every metric stored. Every regression caught.

## The Manifesto

### We Believe

- **Code is data** - Not text files with behavior
- **Distribution is fundamental** - Not an afterthought
- **Privacy is default** - Not optional
- **Testing is declarative** - Not imperative
- **Documentation is generated** - Not maintained

### We Reject

- Virtual DOM overhead
- Class-based programming
- Migration from legacy
- Technical debt
- Bundlers and build steps
- The entire npm ecosystem

### We Deliver

- Applications as data
- Perfect reproducibility
- Distributed by default
- Zero runtime dependencies
- Cryptographic governance
- Mathematical correctness

## Status

Studio is production-ready for greenfield projects. Every component is:

- Functionally complete
- Formally verified
- Performance measured
- Accessibility enforced
- AI-assistant tested

## Philosophy

**"The future doesn't need the past's mistakes."**

We're not competing with React, Vue, or Angular. They're already obsolete. We're building what comes after—when applications are data, distribution is free, and correctness is guaranteed.

If you want to migrate your legacy React app, leave now. If you want to build the future, welcome home.

## License

MIT - Because great ideas should be free

---

_Built with zero dependencies. Tested with mathematical proofs. Deployed everywhere. This is Sitebender Studio._
