# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## The prime directive

Your number one rule in working with this project in *any* capacity is this:

> DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS.

You may think that you are saving time, energy, and resources. YOU ARE NOT. Every time you cheat by guessing or assuming, you make a mess of it and end up wasting far more time, energy, resources, and MONEY.

So don't do it. Work in smaller increments if you must, but check everything carefully before you act and ESPECIALLY before you write code or commit. EVERY SINGLE TIME. NO EXCEPTIONS.

If you cannot do this, then you are of no use at all. This is the MOST IMPORTANT rule.

If you detect any performance constraints or rate limits, immediately inform me rather than attempting workarounds!!!

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

This project (@sitebender) includes a documentation app that uses the associated libraries fully. The docs app showcases all components and their usage, providing a comprehensive guide for developers. It is a Deno/TypeScript JSX app deployed to Deno Deploy. It does not use React or similar library or framework. It uses custom `createElement` and `Fragment` functions to compile JSX to vanilla HTML, and the associated libraries for components, utility functions, and reactivity.

There are three libraries that are part of the @sitebender project:

1. The `@sitebender/engine` library provides adaptive components for responsive design.
2. The `@sitebender/components` library offers a set of accessible UI components.
3. The `@sitebender/toolkit` library includes utility functions and components.

## Architecture

### Dual-Purpose Codebase Structure

This is a dual-purpose codebase with strict separation:

- **`/libraries/`** - Standalone libraries (published to JSR)
  - Zero dependencies, client-side ready
  - MUST use relative imports only (no aliases)
  - Self-contained with no external dependencies
  - Version maintained in `lib/deno.json`
   - Three libraries
      - `@sitebender/engine` - Declarative behavior engine
      - `@sitebender/components` - Accessible UI components
      - `@sitebender/toolkit` - Utility functions and components

- **`/docs/`** - Documentation site
  - Should use path mapping aliases (~components, ~constants, etc.)
  - Demonstrates all components with live examples
  - Shows both HTML output and structured data
  - To the greatest extent possible, uses the associated libraries for components, utility functions, and reactivity.

### File and Folder Structure Rules

1. **One Function/Component Per File**: All functions and components are one per file. Helper functions must be extracted to their own files. Every function/component is exported as default.

2. **Naming Convention**: 
   - Component names (PascalCase) and function names (camelCase) go on the *folder*, not the file
   - Every folder must have an `index.ts` or `index.tsx` file
   - Example: `libraries/toolkit/src/simple/string/chomp/index.ts` exports the `chomp` function.

3. **Folder Hierarchy**: 
   - Folders are nested at the *lowest* branching node below which *all* uses of that function occur
   - If function `f1` is used only by `f2`, and `f2` is used only by `f3`, the folder structure should be `f3/f2/f1/index.ts`
   - This nesting applies recursively through the entire dependency chain
   - Helper functions used only within one parent function should be nested inside that parent's folder
   - Functions used by multiple consumers or externally must remain at the appropriate shared level

4. **Functional Programming**: 
   - Prefer `type` over `interface` for strict FP (exceptions: schema.org component types)
   - All data structures should be immutable
   - Avoid classes and OOP patterns

5. **Type Organization**:
   - Component Props are exported as named exports from the component file, always named `Props`
   - All other types belong in `types/` folders organized by domain
   - Types and constants can be collected in `index.ts` files with named exports
   - Large type files should be broken into subfolders (still using `index.ts`)

6. **Constants**: Domain-specific constants go in a `constants/index.ts` file within the relevant component folder

- **`/tests/`** - Comprehensive test suite

### Key Architectural Patterns

1. **Component Standards**:
   - All `enrich` components extend from `Base` providing template handling and structured data
   - Generate valid semantic HTML with proper structured data
   - `enrich` components support multiple formats: Schema.org, Dublin Core, JSON-LD, and microdata
   - `enrich` components use custom template system with variable substitution
   - Follow BCP-47 language tag standards
   - All props must be immutable types only

2. **Import Patterns**:
   - **Library code (`/libraries/`)**: MUST use relative imports only - no aliases
   - **Documentation (`/docs/`)**: Should use aliases (~components, ~lib, etc.)
   - Always separate type imports from value imports:
   ```tsx
   import type { MyType } from "./types"

   import { MyComponent } from "./components"
   ```
   - Maintain alphabetical order within import groups
   - Separate import groups with a single blank line

3. **Error Handling**:
   - Use Either/Result types everywhere - never throw exceptions (prefer Result)
   - All template strings must be validated before processing
   - Components should gracefully degrade to basic HTML when features fail

4. **Build System**:
   - Dual compilation: libraries (JSR) + documentation site
   - Automatically discover and include component styles/scripts
   - Library build must be completely self-contained (this may be tricky)

### Code Style

- **Formatting**: Tabs for indentation, 80 character line limit
- **No semicolons**: Configured in deno.fmt
- **Import sorting**: Automatic with `deno task fmt`
- **TypeScript**: Strict mode with all checks enabled
- **Array Types**: Always use `Array<T>` syntax instead of `T[]` for better readability and explicitness in type definitions

### Component Development

When creating new components:

1. Follow existing patterns in similar components
2. Add comprehensive tests: behavioral, property-based, and accessibility (axe) following the established patterns in the various `tests/README.md` files
3. Ensure accessibility compliance, proper semantics, excellent UX, responsive design, offline- and mobile-first, and strict standards-compliance with graceful degradation.

### Testing Requirements

- **Accessibility First**: Every component MUST have accessibility tests using @axe-core/playwright
- **Behavior Testing**: Test generated HTML output and structured data, not implementation details
- **Multiple Formats**: Test that components generate correct Schema.org, JSON-LD, and microdata output
- E2E tests for user-facing functionality
- Use property-based testing with fast-check where appropriate
- See the `TESTING.md` file and individual `tests/README.md` files for more details.

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
