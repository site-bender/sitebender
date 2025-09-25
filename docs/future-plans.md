# @sitebender Future Plans

## The TODO List of Victory

These are not tasks of shame, but milestones of revolution.

## The Test Generator Revolution

### The New Testing Paradigm

We're not writing tests manually anymore. We're building machines that write tests.

#### The Test Generator Architecture

For the toolsmith (and eventually all libraries), we're implementing automatic test generation:

1. **Type Signature Analysis** — Extract function signatures and generate appropriate inputs
2. **Property-Based Testing** — Generate tests from mathematical properties
3. **Algebraic Law Detection** — Identify patterns and apply relevant laws
4. **Branch Coverage Analysis** — Parse AST to find all code paths
5. **Automatic Coverage Validation** — Ensure 100% coverage with explicit ignores

#### How It Works

```typescript
// Input: Any function
import map from "libraries/toolsmith/src/vanilla/array/map"

// Generator automatically creates:
- Property tests (functor laws, length preservation)
- Edge cases (empty, null, single element)
- Branch coverage (all if/else paths)
- Performance benchmarks
- Documentation examples
```

#### The 100% Coverage Guarantee

The generator ensures 100% coverage by:

1. Analyzing all branches in the code
2. Generating specific inputs to trigger each branch
3. Running coverage validation
4. Adding `deno-coverage-ignore` with REASON for unreachable code
5. Retrying until 100% is achieved

## Testing Revolution

- **Build the test generator (Auditor)**
  - Revolutionary test generator achieving 100% coverage automatically
  - AST analysis for branch detection
  - Property-based test generation
  - Mathematical law verification
  - "We don't write tests. We generate proofs."

- **Achieve 100% toolsmith coverage automatically**
  - Automatic test generation for all toolsmith functions
  - Property-based testing from mathematical properties
  - Edge case generation and validation

- **Extend generator to all libraries**
  - Apply automatic test generation to all nine libraries
  - Ensure consistent quality across the entire ecosystem

- **Generate property-based tests from types**
  - Leverage TypeScript type information
  - Generate meaningful test cases from function signatures
  - Validate algebraic laws and mathematical properties

## Documentation Automation

- **Generate docs from test cases**
  - Extract examples from actual test usage
  - Living documentation that stays in sync with code
  - Real-world usage patterns as documentation

- **Build living documentation system (Envoy)**
  - Automatic documentation generator from TypeScript code
  - Extracts types, signatures, and properties automatically
  - Replaces verbose JSDoc with single-line descriptions
  - The code IS the documentation
  - Creates a graph of the entire codebase automatically
  - Special comment syntax:
    - `//++` = description of the function/component/constant/type
    - `//--` = tech debt
    - `//??` = help, examples, pros, cons, gotchas
    - `//!!` = critical problems
    - `//>>` = links to other resources

- **Create interactive playgrounds**
  - JSX → IR → HTML visualization sandbox
  - Real-time compilation and preview
  - Monaco-powered editing experience
  - Live examples integrated with documentation

- **Extract examples from actual usage**
  - Mine the codebase for real usage patterns
  - Generate documentation examples from actual implementations
  - Ensure examples are always current and functional

## Compiler Development

- **Build toolsmith compiler for optimizations (Architect IR)**
  - The reactive computation core
  - No VDOM, no bloat, just efficiency
  - IR evaluation for SSR/SSG
  - JSX → IR → JS/JSON/Turtle → HTML/composed functions

- **Generate chainable layer automatically**
  - Automatic generation of fluent interfaces
  - Composable function chains
  - Type-safe method chaining

- **Implement function fusion**
  - Compile-time optimization of function compositions
  - Eliminate intermediate allocations
  - Performance optimization through static analysis

- **Create performance dashboard**
  - Real-time performance monitoring
  - Benchmark tracking across versions
  - Performance regression detection

## Future Promises

### Complete Libraries

- **Complete formulator library parser (Formulator)**
  - Mathematical expression parser
  - Compiles to Architect IR
  - Operator precedence done right
  - Variables and functions support

- **Implement distributed CRDTs (Agent)**
  - Distributed and hybrid data adapters
  - CRDT-based synchronization (eventual consistency)
  - P2P data exchange
  - DID and verifiable credentials
  - IPFS and Solid integration
  - Offline-first by default

### Web3 Integrations

- **Finish web3 integrations**
  - Experimental IPFS/Solid/RDF/blockchain integrations
  - Decentralized identity and data storage
  - Verifiable credentials and attestations
  - Blockchain-based state synchronization

### Development Tooling

- **VSCode plugin development**
  - IDE enhancements for the @sitebender ecosystem
  - Intelligent code completion and suggestions
  - Real-time validation and error detection
  - Integrated documentation and examples
  - Automatic refactoring support

## Revolutionary Goals

### Zero Dependencies Forever

Maintain the zero-dependency philosophy across all libraries and applications.

**Exceptions:** Deno standard library and TypeScript compiler only.

### 100% Test Coverage

Achieve and maintain 100% test coverage across the entire ecosystem through automated test generation.

### Progressive Enhancement Everywhere

Ensure every application and component works perfectly without JavaScript, is beautiful with CSS, and is enhanced by JavaScript.

### Accessibility as Standard

WCAG 2.3 AAA compliance as the baseline, not an afterthought.

### Cognitive Load Minimization

Every feature and optimization should reduce the mental effort required to understand and work with the code.

---

*"These are not tasks of shame, but milestones of revolution."*

— The Architect
