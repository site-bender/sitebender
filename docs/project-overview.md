# @sitebender Project Overview

## The Goal of This Project

Create a zero-dependency ecosystem of nine functional programming libraries that form a fully accessible, progressive enhancement-first web application framework where everything works without JavaScript. Revolutionary tooling automatically generates 100% test coverage (Prover) and documentation from code (Envoy). Every line verified, tested, and documented. No assumptions, no shortcuts, no tech debt.

Perhaps more importantly: create a codebase that **minimizes cognitive load** for developers, making it easy to understand, maintain, and extend.

## The Sacred Architecture

### The Nine Libraries (Zero Dependencies, Maximum Power)

These libraries form the backbone of everything we build. Each has a sacred purpose.

Currently, they are under active development. Expect changes. Not quite alpha yet.

#### @sitebender/toolkit

Pure functional building blocks. The foundation everything else builds upon.

- Zero dependencies, zero compromises
- Monads, combinators, do-notation, and mathematical truth
- If it's not pure, it doesn't belong here (IO excepted)

#### @sitebender/components

Accessible JSX components forming a declarative DSL for web applications.

- Semantic HTML generation
- Schema.org structured data
- Progressive enhancement built-in
- JSX → IR compilation
- Components for everything, including:
  - Validation
  - Conditional display
  - Data binding
  - Event handling
  - Theming
  - Calculations
  - Formatting

#### @sitebender/engine

The reactive computation core. No VDOM, no bloat, just efficiency.

- IR evaluation for SSR/SSG
- Hydration without the heavyweight
- Calculations that actually calculate
- JSX → IR → JS/JSON/Turtle → HTML/composed functions

#### @sitebender/maths

Mathematical expression parser (coming soon).

- Compiles to Engine IR
- Operator precedence done right
- Variables and functions

#### @sitebender/mesh

Distributed and hybrid data adapters (future).

- CRDT-based synchronization (eventual consistency)
- P2P data exchange
- DID and verifiable credentials
- IPFS and Solid integration
- Offline-first by default

#### @sitebender/envoy

Automatic documentation generator from TypeScript code.

- Extracts types, signatures, and properties automatically
- Replaces verbose JSDoc with single-line descriptions (blocks if needed)
- The code IS the documentation
- Can use markdown in descriptions
- Uses different comment syntax to indicate:
  - `//` = regular comment (not part of docs)
  - `//++` = description of the function/component/constant/type
  - `//--` = tech debt
  - `//??` = help, such as examples, pros, cons, gotchas, and more
  - `//!!` = critical problems
  - `//>>` = links to other resources
- Creates a graph of the entire codebase automatically

#### @sitebender/prover

Revolutionary test generator achieving 100% coverage automatically.

- AST analysis for branch detection
- Property-based test generation
- Mathematical law verification
- "We don't write tests. We generate proofs."

#### @sitebender/parser

The only library with a dependency: the TypeScript compiler.

- Parses TypeScript/JSX to extract types, signatures, properties, and comments (for Envoy)
- Used by Envoy and Prover
- Formal API for future tools

#### @sitebender/foundry

Tools for property-based testing (QuickCheck style), fake data generation, and more.

### The Three Applications

#### /applications/docs

Our own documentation, eating our own dog food.

- Live examples of everything
- Both HTML and structured data visible
- The ultimate test of our libraries

#### /applications/playground

JSX → IR → HTML visualization sandbox.

- Real-time compilation
- SSR/hydration preview
- Monaco-powered editing

#### /applications/web3-lab

Experimental IPFS/Solid/RDF/blockchain integrations.

- Where we push boundaries
- Not production ready
- Expect explosions

### Supporting Cast

- **`/infrastructure/`** — Docker, observability, local HTTPS
- **`/plugins/`** — IDE enhancements (VSCode for now)
- **`/scripts/`** — Build tools and automation
- **`/tools/`** — CLI, agent bridge, web3 utilities
- **`/tests/`** — Where behavior meets verification

## Progressive Enhancement Philosophy

### The Three Layers of Truth

```
┌────────────────────────────────────────────┐
│    LAYER 3: Full Enhancement               │
│    JavaScript enriches the experience      │
│    (But is never required)                 │
├────────────────────────────────────────────┤
│    LAYER 2: Styled with CSS                │
│    Beautiful, responsive, themed           │
│    (But works without it)                  │
├────────────────────────────────────────────┤
│    LAYER 1: Semantic HTML                  │
│    Works in Lynx, Mosaic, everything       │
│    (This is the foundation)                │
└────────────────────────────────────────────┘
```

### The Unbreakable Rules

1. **Forms work without JavaScript**
   - Standard POST/GET submissions
   - Server-side validation
   - No AJAX-only endpoints

2. **Navigation works without JavaScript**
   - Real links to real pages
   - No SPA-only routes
   - Back button always works

3. **Content is accessible without CSS**
   - Semantic HTML structure
   - Logical reading order
   - No layout-dependent content

4. **Everything has keyboard access**
   - Tab order makes sense
   - Focus indicators visible
   - No mouse-only interactions

5. **Offline-first, online-enhanced**
   - CRDTs for eventual consistency (see libraries/mesh)
   - IndexedDB for complex state
   - Service workers for caching

## Core Principles

### Minimizing Cognitive Load

**COGNITIVE LOAD IS THE ENEMY. MINIMIZE IT AT ALL COSTS.**

Every single rule in this project exists for ONE PURPOSE: reduce the mental effort required to understand code.

#### Why Cognitive Load Matters

- **Developers work easier and longer** when their brains aren't overloaded
- **Fewer bugs** because there's less to mentally track and get wrong
- **Faster development** because understanding is instant, not gradual
- **Happier teams** because work feels effortless instead of exhausting
- **Better business outcomes** because velocity increases and defects decrease
- **Non-technical stakeholders can understand** because cognitive load is minimal

#### How Every Rule Serves This Goal

- **One function per file** = Zero mental overhead figuring out what's in a file
- **Named functions over arrows** = Stack traces make sense, no mental parsing
- **Descriptive function names** = Code reads like English, zero translation needed
- **No semicolons** = Remove visual noise that adds zero meaning
- **Case conventions** = Instant recognition of what type of thing you're looking at
- **Default exports** = One thing per file, one import line, zero decisions
- **No mutations** = Never wonder "what's the state now?", it's always predictable
- **Pure functions** = Input → Output, no hidden side effects to track mentally
- **No classes/OOP** = No inheritance hierarchies to mentally traverse
- **Toolkit functions** = Pre-solved problems, zero cognitive overhead on "how"

### Accessibility First

- **WCAG 2.3 AAA or better** — Screen readers are first-class citizens
- **Keyboard navigation for everything** — No mouse-only interactions
- **Accessibility from day one** — NO EXCEPTIONS

### Zero Dependencies

This codebase has zero dependencies by design. Keep it that way.

**Exceptions:** Deno standard library and TypeScript compiler only.

---

*"The Holy Grail is code that reads like well-written English and requires zero mental effort to understand."*

— The Architect