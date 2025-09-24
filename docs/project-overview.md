# @sitebender Project Overview

## The Goal of This Project

Create a zero-dependency ecosystem of nine functional programming libraries that form a fully accessible, progressive enhancement-first web application framework where everything works without JavaScript. Revolutionary tooling automatically generates 100% test coverage (Logician) and documentation from code (Envoy). Every line verified, tested, and documented. No assumptions, no shortcuts, no tech debt.

Perhaps more importantly: create a codebase that **minimizes cognitive load** for developers, making it easy to understand, maintain, and extend.

## The Sacred Architecture

### The Ten Libraries (Zero Dependencies, Maximum Power)

These libraries form the backbone of everything we build. Each has a sacred purpose.

Currently, they are under active development. Expect changes. Not quite alpha yet.

#### @sitebender/toolsmith (potential name change to toolsmith/)

Pure functional building blocks. The foundation everything else builds upon.

- Zero dependencies, zero compromises
- Monads, combinators, do-notation, and mathematical truth
- If it's not pure, it doesn't belong here (IO excepted)

#### @sitebender/codewright (potential name change to codewright)

Accessible JSX components forming a declarative DSL for web applications. For those who just want a component library.

- Semantic HTML generation
- Schema.org structured data
- Progressive enhancement built-in
- JSX → Plain vanilla HTML compilation
- Overrides HTML elements to force standards-compliance and accessibility
  - Only permitted attributes of the correct type
  - Only permitted descendants

#### @sitebender/architect (potential name change to architect)

The reactive computation core. No VDOM, no bloat, just efficiency.

- IR evaluation for SSR/SSG
- Hydration without the heavyweight
- Calculations that actually calculate
- JSX → IR → JS/JSON/Turtle → HTML/composed functions
- Components for everything, including:
  - Validation
  - Conditional display
  - Data binding
  - Event handling
  - Theming
  - Calculations
  - Formatting
- Incorporates @sitebender/codewright (codewright) for essential HTML output components
- Adds JSX components that compile (eventually) to composed functions

#### @sitebender/formulator (potential name change to formulator)

Mathematical expression parser.

- Compiles to @sitebender/architect (architect) IR
- Operator precedence done right
- Variables and functions

"(a + b) \* c" compiles to something like:

```json
{
  "operation": "multiply",
  "multiplicand": {
    "operation": "add",
    "augend": {
      "type": "variable",
      "name": "a"
    },
    "addend": {
      "type": "variable",
      "name": "b"
    }
  },
  "multiplier": {
    "type": "variable",
    "name": "c"
  }
}
```

It also works in reverse, converting the JSON object above to the formula. Not limited to JSON, also supports the other formats enabled by @sitebender/architect (architect): YAML, TOML, Turtle triples, etc.

#### @sitebender/agent (potential name change to agent)

Distributed and hybrid data adapters.

- CRDT-based synchronization (eventual consistency)
- P2P data exchange
- DID and verifiable credentials
- IPFS and Solid integration
- Offline-first by default

#### @sitebender/envoy

Automatic documentation generator and code base observability/control platform from TypeScript code.

- Extracts types, signatures, and properties automatically
- Replaces verbose JSDoc with single-line descriptions (blocks if needed)
- The code IS the documentation
- Can use markdown in descriptions
- Uses different "Envoy" comment syntax to indicate:
  - `//` = regular comment (not part of docs)
  - `//++` = description of the function/component/constant/type
  - `//--` = tech debt
  - `//??` = help, such as examples, pros, cons, gotchas, and more
  - `//!!` = critical problems
  - `//>>` = links to other resources
- Comments can be cateogorized, e.g., [MODULE], [EXAMPLE], etc.
- Implements HATEOAS for documentation
- Uses paths, configuration files, etc. to create a graph of the entire codebase automatically

#### @sitebender/logician (potential name change to logician)

Revolutionary test generator achieving 100% coverage automatically.

- AST analysis for branch detection
- Property-based test generation
- Mathematical law verification (commutative, associative, idempotent, functor, etc.)
- "We don't write tests. We generate proofs."

#### @sitebender/linguist (potential name change to linguist)

The only library with a dependency: the TypeScript compiler.

- Parses TypeScript/JSX to extract types, signatures, properties, and comments (for Envoy)
- Used by Envoy and Logician (logician)
- Formal API for future tools

#### @sitebender/quarrier (potential name change to quarrier)

Tools for property-based testing (QuickCheck style), fake data generation, and more.

Can generate sample Turtle triples for test triple stores and inferencing.
Can "shrink".

#### @sitebender/warden

Cryptographically-enforced architectural governance.

##### Key Features

###### Architectural Governance

- **Zero architectural drift** - cryptographic contracts prevent unintended changes
- **Instant onboarding** - new developers immediately understand and respect boundaries
- **AI-safe development** - AI assistants cannot accidentally break architectural patterns
- **Reduced code review burden** - automated validation catches issues before review

###### Privacy Enforcement

- **Underscore folder system** - visual privacy without encapsulation complexity
- **Import validation** - prevents access to private functions across boundaries
- **Nested privacy** - supports complex privacy hierarchies
- **Clear violation reporting** - actionable feedback for developers

###### Performance & Developer Experience

- **Sub-5-second validation** - maintains development velocity
- **Zero false positives** - 100% accuracy in violation detection
- **Clear error messages** - actionable feedback for developers
- **Git integration** - seamless workflow integration

### The Three Applications

#### /applications/mission-control (potential name change to mission-control)

Our own documentation, eating our own dog food.

- Live examples of everything
- Both HTML and structured data visible
- The ultimate test of our libraries
- Generated by Envoy

#### /applications/the-workshop (potential name change to the-workshop)

JSX → IR → JSON/YAML/TOML/Turtle -> DB -> HTML visualization sandbox.

- Real-time compilation
- SSR/hydration preview
- Monaco-powered editing
- A tool for working with @sitebender/architect (architect) in real time, visualizing the effect of code changes

#### /applications/the-agency (potential name change to the-agency)

Experimental IPFS/Solid/RDF/blockchain integrations.

- Where we push boundaries
- Works with @sitebender/agent (agent)
- Complete control and observability of distributed system
- Auto-generated by the agent library

### Supporting Cast

- **`/infrastructure/`** — Docker, observability, local HTTPS
- **`/plugins/`** — IDE enhancements (VSCode for now)
- **`/scripts/`** — Build tools and automation
- **`/tools/`** — CLI, agent bridge, web3 utilities
- **`/tests/`** — Where behavior meets verification
