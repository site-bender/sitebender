# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## The prime directive

Your number one rule in working with this project in *any* capacity is this:

> DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS.

You may think that you are saving time, energy, and resources. YOU ARE NOT. Every time you cheat by guessing or assuming, you make a mess of it and end up wasting far more time, energy, resources, and MONEY.

So don't do it. Work in smaller increments if you must, but check everything carefully before you act and ESPECIALLY before you write code or commit. EVERY SINGLE TIME. NO EXCEPTIONS.

If you cannot do this, then you are of no use at all. This is the MOST IMPORTANT rule.

If you detect any performance constraints or rate limits, immediately inform me rather than attempting workarounds!!!

NEVER EVER RUN A `git clean` OR ANY OTHER COMMAND THAT DELETES FILES WITH NO CHANCE OF RECOVERY WITHOUT MY EXPRESSED AND EXPLICIT PERMISSION **FIRST**. NEVER DELETE ANYTHING WITHOUT MY EXPLICIT PERMISSION **FIRST**.

## Progressive Enhancement Philosophy

**CRITICAL**: This set of libraries and associated documentation web app follow a strict progressive enhancement approach:

1. **No JavaScript Required**: ALL components MUST work without JavaScript
   - Forms submit normally via standard HTTP POST/GET
   - Interactive features are enhancements, not requirements
   - Server-side rendering is the default, client-side is enhancement

2. **Browser-First APIs**: 
   - Use native browser validation for forms
   - Leverage all WHATWG/W3C standards
   - CSS3/4 for theming and styling
   - Components may enhance but not replace base functionality

3. **Future JavaScript Enhancements** (not yet implemented):
   - TypeScript scripts compiled to vanilla JS
   - DOM manipulation for enhanced interactivity
   - Form submissions captured and converted to AJAX when JS available
   - State management via:
     - IndexedDB for complex offline data
     - LocalStorage/SessionStorage for simple state
     - Cookies for server-readable state
     - URL parameters for shareable state
   - Offline-first with eventual synchronization via CRDTs
   - Live updates (like RelativeTime) as progressive enhancements
   - AuthN with WebAuthn as enhancement and DIDs for identity

4. **Accessibility Standards**:
   - Target WCAG 2.3 AAA compliance (or newest standard)
   - Semantic HTML is non-negotiable
   - ARIA only to enhance, never to fix bad markup
   - Keyboard navigation for all interactive elements
   - Screen reader tested

5. **Component Resilience**:
   - Must work with CSS disabled (semantic HTML)
   - Must work with JS disabled (forms, navigation)
   - Must work offline (with appropriate fallbacks)
   - Must be themeable via CSS custom properties

## Project Overview

This project (@sitebender) includes a documentation app (`applications/docs`) that will use the associated libraries fully. The docs app will showcase all components and their usage, providing a comprehensive guide for developers. It is a Deno/TypeScript JSX app that will be deployed to Deno Deploy. It does NOT use React or similar library or framework. It uses custom `createElement` and `Fragment` functions to compile JSX to an IR, which is compiled to a JSON/RDF configuration, which can then be converted to vanilla HTML. It uses the associated libraries for components, utility functions, and superpower such as reactivity, state management, etc.

### The libraries

There are five libraries that are part of the @sitebender project. They live in the `libraries/` folder and will be published to JSR (jsr.dev):

1. The `@sitebender/components` library offers a set of accessible JSX components that effectively form a declarative DSL for building entire web applications.
2. The `@sitebender/distributed` library provides adapters and guidance for distributed and hybrid data.
3. The `@sitebender/engine` library provides a core runtime that evaluates a compact, versioned IR to produce semantic HTML (SSR/SSG) and optional client behaviors (CSR hydration) without a VDOM.
4. The `@sitebender/maths` library provides a parser for math-like expressions that compile to Engine operator graphs (IR).
5. The `@sitebender/toolkit` library provides zero-dependency, strictly-typed, functional building blocks used across Engine, Components, scripts, and apps.

### The applications

There are currently three applications that are part of the @sitebender project. They live in the `applications/` folder and will be deployed to Deno Deploy:

1. The `applications/docs` folder is an application that will provide complete documentation for the @sitebender project and its libraries, including live examples of all components and their usage.
2. The `applications/playground` application provides a live, sandboxed playground to visualize JSX → IR JSON and preview SSR/hydration behavior (and will eventually include more advanced features).
3. The `applications/web3-lab` is an experimental sandbox for IPFS/Solid/RDF/blockchain integrations.

### The infrastructure

The `infrastructure/` folder provides local observability and RDF stack with HTTPS via Caddy. This includes Docker configurations for Prometheus, Thanos, Grafana, MinIO, Fuseki, and Caddy, along with provisioning for Grafana and TLS via mkcert for local *.localhost hosts.

### The plugins

The `plugins/` folder contains @sitebender plugins for various IDEs and tools to enhance developer experience when working with the @sitebender libraries and applications. Currently, only a VSCode extension is planned.

### Scripts

The `scripts/` folder contains various utility scripts to assist with development, deployment, and maintenance of the @sitebender project. These scripts are written in TypeScript and can be executed using Deno.

### The tools

There are three applications in the `tools/` folder that provide various utilities for working with the @sitebender project:

1. The `tools/cli` application provides a command-line interface for interacting with the @sitebender libraries and applications.
2. The `tools/agent` application is a VS Code-side bridge that invokes Deno scripts for common workflows; minimal Node glue, real work in Deno.
3. The `tools/web3-tools` application provides various utilities for working with Web3 technologies, such as IPFS and blockchain.

## Architecture

### Dual-Purpose Codebase Structure

This is a dual-purpose codebase with strict separation:

- **`/libraries/`** - Standalone libraries (published to JSR)
  - Zero dependencies, client-side ready
  - MUST use relative imports only (no aliases)
  - Self-contained with no external dependencies
  - Version maintained in `lib/deno.json`

- **`/applications/docs/`** - Documentation site
  - Should use path mapping aliases (~components, ~constants, etc.)
  - Demonstrates all components with live examples
  - Shows both HTML output and structured data
  - We're our own first customer: to the greatest extent possible, all our applications use the associated libraries for components, utility functions, reactivity, state management, distributed systems, etc.

### File and Folder Structure Rules

1. **One Function/Component Per File**: All functions and components are one per file. Helper functions must be extracted to their own files. *Every function/component is exported as default.*

2. **Naming Convention**: 
   - Component names (PascalCase) and function names (camelCase) go on the *folder*, not the file
   - Every folder must have an `index.ts` or `index.tsx` file (Exception: test files use `index.test.ts` for Deno test discovery)
   - Example: `libraries/toolkit/src/simple/string/chomp/index.ts` exports the `chomp` function
   - Test example: `libraries/toolkit/tests/behaviors/array/map/index.test.ts` tests the `map` function

3. **Folder Hierarchy**: 
   - Folders are nested at the *lowest* branching node below which *all* uses of that function occur
   - If function `f3` is used only by `f2`, and `f2` is used only by `f1`, the folder structure should be `f1/f2/f3/index.ts`
   - This nesting applies recursively through **the entire dependency chain**
   - Folders for functions used only within one parent function should be nested inside that parent's folder
   - Functions used by multiple consumers or externally must remain at the appropriate shared level (lowest common ancestor)
   - **Benefits of this structure**:
     - Complete tree structure visible when browsing folders in IDE
     - Extreme modularity - delete entire modules by removing a single folder
     - No orphaned code or tech debt - all dependencies are contained
     - **Strict decoupling** - dependencies flow in one direction only
     - Clear ownership and boundaries between modules

4. **Functional Programming**: 
   - Prefer `type` over `interface` for strict FP (exceptions: schema.org component types)
   - All data structures should be immutable
   - **Avoid classes and OOP patterns at all times**
   - Pure functions only - no side effects (exceptions: I/O, logging, etc.)
   - **Function Style Evolution**: The codebase is transitioning from curried arrow functions to named functions. New functions should use named functions. Existing curried arrow functions will be converted gradually as they are tested or modified. This is a long-term migration with thousands of functions to update
   - **Benefits of Named Functions**:
     - **Stack traces**: Clear function names in error stack traces for better debugging
     - **Hoisting**: Full hoisting (declaration and initialization) allows flexible code organization
     - **`this` binding**: Predictable `this` context (though we avoid `this` in FP)
     - **Name property**: Proper `name` property useful for debugging, profiling, and reflection
     - **Recursion**: Can reference themselves directly by name for cleaner recursive implementations
     - **Performance**: Better optimization by JavaScript engines for frequently-called functions
     - **Debugging/Profiling**: Superior visibility in memory profilers, performance tools, and debuggers
     - **Self-documenting**: `function` keyword provides immediate visual recognition
   - **Single Responsibility**: Every function does ONE thing only. Functions should be terse but readable with descriptive names (avoid abbreviations). Most functions are only a few lines of code
   - **Readability**: Named functions provide the `function` keyword as a visual cue. Arrow functions are best reserved for one-liners. Combined with one-function-per-file, opening any file shows the entire function at a glance
   - **Composition**: Components should use careful composition to remain terse and readable, following the same single-responsibility principle

5. **Type Organization**:
   - Component Props are exported as named exports from the component file, always named `Props`
   - **All other types belong in `types/` folders organized by domain**. No exceptions.
   - Types should be organized by domain, not by usage
   - Types and constants can be collected in `index.ts` files with named exports
   - Large type files should be broken into subfolders (still using `index.ts`)

6. **Constants**:
   - Domain-specific constants go in a `constants/index.ts` file within the relevant component folder
   - Constants used only within a single function/component can be defined in that file
   - Shared constants used across multiple components/functions should be placed in a `constants/` folder at the lowest common ancestor level

- **`/tests/`** - Comprehensive test suite

### Key Architectural Patterns

1. **Component Standards**:
   - All `libraries/components/src/define/Thing` components extend from `Base` providing template handling and structured data
   - All components must generate valid semantic HTML with proper structured data
   - `define` components must support multiple formats: Schema.org, Dublin Core, JSON-LD, and microdata
   - `define` components use custom template system with variable substitution
   - Follow BCP-47 language tag standards
   - All props must be immutable types only

2. **Import Patterns**:
   - **Library code (`/libraries/`)**: 
     - MUST use relative imports for internal library code only - no aliases
     - External dependencies (Deno std, npm packages) use their standard import paths
   - **Application code (`/applications/`)**: 
     - Should use aliases (~components, ~constants, etc.) for application code
     - Import libraries as `@sitebender/<library-name>` (will eventually use published versions from JSR)
   - **Test code**: 
     - Tests use relative imports to reach the code they're testing
     - External test dependencies (fast-check, Deno std/testing) use standard import paths
   - Always separate type imports from value imports:
   ```tsx
   import type { MyType } from "./types"

   import { MyComponent } from "./components"
   ```
   - Maintain alphabetical order within import groups
   - Separate import groups with a single blank line

3. **Error Handling**:
   - Use Either/Result types everywhere - never throw exceptions (prefer Result)
    - Exceptions: `libraries/toolkit/src/simple` functions return `undefined` or `null`
    - `libraries/toolkit/src/chainable` functions must take and return monads
   - All template strings must be validated before processing
   - Components should gracefully degrade to basic HTML when progressive enhancements fail

4. **Build System**:
   - Dual compilation: libraries (JSR) + applications (site generation): this needs work!
   - Applications must discover and include component styles/scripts
   - Library build must be completely self-contained (this may be tricky)

### Code Style

- **Formatting**: *Tabs* for indentation, 80 character line limit
- **No semicolons**: Configured in deno.fmt
- **Import sorting**: Automatic with `deno task fmt`
- **TypeScript**: Strict mode with all checks enabled **at all times**
- **Array Types**: Always use `Array<T>` syntax instead of `T[]` for better readability and explicitness in type definitions
- **JSDoc Comments**: Every function and component must have comprehensive JSDoc comments, including:
  - Description of purpose
  - Explanation of parameters and return values
  - Examples of usage
  - Any exceptions or special behavior
  - Include properties such as @curried, @pure, etc. where applicable
- **Descriptive Naming**: Use clear, descriptive names for functions, variables, and types
- **No `any` type**: Avoid using `any` unless absolutely necessary; prefer `unknown` and proper type guards
- **Never use `var` or `let`**: Exceptions must be explicitly approved

### Component Development

When creating new components:

1. Follow existing patterns in similar components
2. Add comprehensive tests: behavioral, property-based, and accessibility (axe) following the established patterns in the various `tests/README.md` files
3. Ensure accessibility compliance, proper semantics, excellent UX, responsive design, offline- and mobile-first, and strict standards-compliance with graceful degradation.

### Testing Requirements

- **Test Organization**: ALL tests MUST be in a `tests/` folder - never colocated with source code
  - Behavioral tests span multiple functions/components, making colocation impossible
  - Integration tests test compositions of functions, not single implementations
  - Test files use `index.test.ts` naming for Deno test discovery
- **Accessibility First**: Every component that generates HTML MUST have accessibility tests using @axe-core/playwright
- **Behavior Testing**: Test observable behaviors and integrations, not implementation details
- **Integration Over Unit**: PREFER integration tests showing real function compositions
- **Multiple Formats**: Components must test Schema.org, JSON-LD, and microdata output
- **E2E tests**: For user-facing functionality in applications and HTML-generating components
- **Property-based testing**: Use fast-check extensively for mathematical properties and invariants
- **Dependency Injection**: Only where necessary for I/O and impure actions (see `libraries/toolkit/src/monads`)
- See the `testing.md` file and individual `tests/README.md` files for more details.

### Documentation Standards

- **Live Examples**: Documentation must include working examples of all components
- **Structured Data Visibility**: Show both HTML output and generated structured data
- **Category Navigation**: Organize by component categories for easy discovery

We will discuss this more when we get to it. We want to create something similar to Jupyter notebooks and/or storybook using Monaco Editor.

### JSR Publication Requirements

- Maintain version in `libraries/**/deno.json` separately from main project
- Library uses relative imports only (no aliases) for external compatibility
- Must remain zero-dependency for client-side usage
- Export patterns: default for components and functions, named for types and constants

### Build Process

The build system supports:
- **Dual compilation**: Libraries for JSR + documentation site generation
- **Asset discovery**: Automatically includes component styles/scripts (to be discussed)
- **Self-contained output**: Library build has no external dependencies
- Outputs to `/dist/` for documentation, `/libraries/**` published to JSR

### Version Control & Commits

- **Conventional Commits**: Use Conventional Commit syntax (e.g., `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`)
- **Detailed Messages**: Include comprehensive commit messages explaining the why, not just the what
- **Small & Focused**: Each commit should address one specific change or issue
- **Regular Commits**: Commit frequently to avoid large buildups and conflicts
- **Own Changes Only**: When multiple AIs or developers work on the same codebase, commit only your changes
- **Atomic Commits**: Each commit should leave the codebase in a working state

## TODO - Testing & Documentation Tasks

The following items need attention but are not critical blockers:

### Testing
- **Document test helpers**: Create comprehensive documentation for all test helper functions
- **Add E2E examples**: Show toolkit functions used in real component/engine scenarios (in components/engine tests)
- **Verify integration test coverage**: Ensure we have sufficient integration tests showing function compositions
- **Create test data generators**: Standardized test data generation for consistency

### Documentation
- **Component CSS collection**: Document how CSS is discovered and bundled
- **Enhancement scripts**: Document the progressive enhancement script system
- **Build process**: Complete documentation of dual compilation system

**There is much more to discuss here. We will add to this file as we discover missing pieces.**

**AT ALL TIMES DO NOT CREATE TECH DEBT. DO NOT TAKE SHORTCUTS. DO NOT GUESS. IF YOU ARE UNSURE, ASK.**
