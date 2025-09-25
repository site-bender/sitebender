# @sitebender/studio

A Deno + TypeScript framework for building powerful web applications through declarative JSX, without the complexity of traditional JavaScript frameworks.

## What is Studio?

Studio is a creation framework where authors write JSX and the system handles everything else - validation, persistence, distribution, offline support, and reactive updates. It compiles JSX to an internal representation, persists data in a triple store, and renders directly to the DOM without a virtual DOM layer.

## Key Principles

- **Declarative authoring**: Write JSX with semantic HTML. No imperative JavaScript required.
- **Single source of truth**: Validation rules defined once in JSX drive client validation, server validation, and database constraints
- **Zero dependencies**: Core libraries have no external runtime dependencies
- **Progressive enhancement first**: Server-side rendering by default, client behaviors attached as needed
- **Data-centric architecture**: Triple store with SHACL/OWL2 semantics as the canonical data model

## Who is this for?

- **Designers** who want to build complete applications using only HTML-like syntax
- **AI agents** that can iterate on declarative structures to create applications
- **Developers** building greenfield projects who value correctness and simplicity

This is explicitly NOT a migration path from React, Vue, or other frameworks. It's for building from scratch.

## Architecture

### Core Flow

```
JSX → Internal Representation → JSON/YAML/TOML/Turtle → DOM
```

The Architect renderer takes JSON configuration and builds the DOM directly, attaching behaviors (calculation, formatting, validation) as properties on DOM elements.

### Libraries

- **Agent** (`@sitebender/agent`) - Distributed/offline capabilities (CRDTs, DID/VC, IPFS)
- **Architect** (`@sitebender/architect`) - Rendering pipeline and reactive core
- **Pagewright** (`@sitebender/pagewright`) - Accessible JSX components for semantic HTML
- **Envoy** (`@sitebender/envoy`) - Living documentation & observability platform with code intelligence
- **Formulator** (`@sitebender/formulator`) - Bidirectional formula parser (math string ↔ Architect IR)
- **Arborist** (`@sitebender/arborist`) - TypeScript/JSX parsing to AST for tools
- **Auditor** (`@sitebender/auditor`) - Proof and test generation for entire codebase
- **Quarrier** (`@sitebender/quarrier`) - Data generators (including triples) and property-based testing
- **Quartermaster** (`@sitebender/quartermaster`) - Application generator CLI
- **Steward** (`@sitebender/steward`) - Deterministic code style enforcement based on best practices
- **Toolsmith** (`@sitebender/toolsmith`) - Pure functional programming primitives
- **Warden** (`@sitebender/warden`) - Cryptographic architectural governance and import enforcement

## Development Constraints

- **Runtime**: Deno + TypeScript only, pure ESM, no bundling
- **Dependencies**: Zero runtime dependencies (except Arborist which uses TypeScript compiler)
- **Code organization**: One function per file, direct tree imports only, no barrel files
- **Privacy**: Underscore folders are private, no escape hatches
- **Accessibility**: Enforced via axe, required not optional

## Governance

Warden provides cryptographic enforcement of architectural rules, especially for AI safety:

- Hash-locked contracts ensure code follows specifications
- Import validation prevents accessing private code
- No barrel files or re-exports allowed
- Violations warn in PRs, block on main branch

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sitebender/sitebender.git

# Install Deno if needed
curl -fsSL https://deno.land/install.sh | sh

# Run tests
deno task test

# Check governance rules
deno task enforce
```

## Example

```jsx
// Define a validated input in JSX
<Input type="number">
  <Validation min={5} max={40} excludeRange={{ min: 10, max: 25 }} />
</Input>
```

This single declaration:

- Creates client-side validation
- Defines server-side validation rules
- Specifies database schema constraints
- All from one source of truth

## Status

Currently in active development. Priority order:

1. Warden - Governance enforcement (highest priority)
2. Toolsmith - Core functional primitives
3. Steward - Style enforcement
4. Parallel work on independent libraries
5. Dependent libraries (Auditor, Envoy)

## Philosophy

"This is not for everyone."

Studio prioritizes correctness, simplicity, and governance over broad compatibility. If you want to migrate an existing React app or need the npm ecosystem, this isn't the framework for you. If you want to build something new and correct from the ground up, welcome.

## License

MIT
