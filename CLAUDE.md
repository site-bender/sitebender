# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Progressive Enhancement Philosophy

**CRITICAL**: This library follows a strict progressive enhancement approach:

1. **No JavaScript Required**: ALL components MUST work without JavaScript
   - Forms submit normally via standard HTTP POST/GET
   - Interactive features are enhancements, not requirements
   - Server-side rendering is the default, client-side is enhancement

2. **Browser-First APIs**: 
   - Use native browser validation for forms
   - Leverage all WHATWG/W3C standards
   - CSS3/4 for theming and styling
   - Web Components may enhance but not replace base functionality

3. **Future JavaScript Enhancements** (not yet implemented):
   - TypeScript scripts compiled to vanilla JS
   - DOM manipulation for enhanced interactivity
   - Form submissions captured and converted to AJAX when JS available
   - State management via:
     - IndexedDB for complex offline data
     - LocalStorage/SessionStorage for simple state
     - Cookies for server-readable state
     - URL parameters for shareable state
   - Offline-first with eventual synchronization
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

This is a Deno-based adaptive web component library (@sitebender/sitebender) in `lib` that provides type-safe, progressively enhanced components with build-time validation, reactive calculations, and Schema.org structured data support. The library generates semantic HTML that works without JavaScript while supporting powerful client-side enhancements.

The library also provides a large set of semantic components intended to extend the semantics of HTML, allowing developers to create rich, structured content that is both machine-readable and accessible.

Finally, the library includes a documentation site (in `src`) that demonstrates all components with live examples and structured data visibility.

## Essential Commands

### Development
```bash
# Start development server with hot reload (port 5556)
deno task dev

# Run tests (includes unit, E2E, and accessibility tests)
deno task test

# Format code (runs sort imports then deno fmt)
deno task fmt

# Lint code
deno task lint

# Build development version
deno task build

# Full production build
deno task build:full

# Clean build artifacts
deno task clean
```

### Testing Specific Components
```bash
# Run a specific test file
deno test tests/unit/components/Thing/Person.test.tsx

# Run E2E tests only
deno task test:e2e

# Run accessibility tests
deno test tests/a11y/
```

## Architecture

### Dual-Purpose Codebase Structure

This is a dual-purpose codebase with strict separation:

- **`/lib/`** - Standalone library (published to JSR)
  - Zero dependencies, client-side ready
  - MUST use relative imports only (no aliases)
  - Self-contained with no external dependencies
  - Version maintained in `lib/deno.json`
  
- **`/src/`** - Documentation site  
  - MAY use path mapping aliases (~components, ~constants, etc.)
  - Demonstrates all components with live examples
  - Shows both HTML output and structured data

### Component Organization

Components are organized by semantic categories:
- **`/lib/components/`**
  - `schema.org` - Components that extend Schema.org types
    - `Base/` - Base component that all others extend
    - `Thing/` - Schema.org hierarchy (CreativeWork, Person, Organization, etc.)
  - `semantic/` - Organized by categories:
    - `scientific/` - TechnicalTerm, TaxonomicName, etc.
    - `textual/` - ForeignTerm, WordAsWord, etc.
    - `quotations/` - Dialogue, CitedQuote, etc.
    - `narrative/` - StageDirection, InternalMonologue, etc.
    - `emotional/` - Sarcasm, Irony, etc.
    - `cultural/` - Idiom, Archaism, etc.
    - `emphasis/` - Various emphasis patterns
  
- **`/lib/types/`** - Metadata-specific types in correct subfolders

### File and Folder Structure Rules

1. **One Function/Component Per File**: All functions and components are one per file. Helper functions must be extracted to their own files. Every function/component is exported as default.

2. **Naming Convention**: 
   - Component names (PascalCase) and function names (camelCase) go on the *folder*, not the file
   - Every folder must have an `index.ts` or `index.tsx` file
   - Example: `lib/components/semantic/temporal/formatDate/index.ts` exports `formatDate`

3. **Folder Hierarchy**: 
   - Folders are nested at the *lowest* branching node below which *all* uses of that function occur
   - If function `f1` is used only by `f2`, and `f2` is used only by `f3`, the folder structure should be `f3/f2/f1/index.ts`
   - This nesting applies recursively through the entire dependency chain
   - Helper functions used only within one parent function should be nested inside that parent's folder
   - Functions used by multiple consumers or externally must remain at the appropriate shared level

4. **Functional Programming**: 
   - Prefer `type` over `interface` for strict FP (exceptions: schema.org component types)
   - All data structures should be immutable
   - Avoid classes except for components extending Base

5. **Type Organization**:
   - Component Props are exported as named exports from the component file, always named `Props`
   - All other types belong in `/lib/types/` organized by domain
   - Types and constants can be collected in `index.ts` files with named exports
   - Large type files should be broken into folders (still using `index.ts`)

6. **Constants**: Domain-specific constants go in a `constants/index.ts` file within the relevant component folder

- **`/tests/`** - Comprehensive test suite
  - `e2e/` - Playwright end-to-end tests
  - `a11y/` - Accessibility tests (REQUIRED for all components)
  - `unit/` - Component unit tests

### Key Architectural Patterns

1. **Component Standards**:
   - All components extend from `Base` providing template handling and structured data
   - Generate valid semantic HTML with proper structured data
   - Support multiple formats: Schema.org, Dublin Core, JSON-LD, and microdata
   - Use custom template system with variable substitution
   - Follow BCP-47 language tag standards
   - All props must be immutable types only

2. **Import Patterns**:
   - **Library code (`/lib/`)**: MUST use relative imports only - no aliases
   - **Documentation (`/src/`)**: MAY use aliases (~components, ~lib, etc.)
   - Always separate type imports from value imports:
   ```tsx
   import type { MyType } from "./types"
   import { MyComponent } from "./components"
   ```
   - Maintain alphabetical order within import groups

3. **Error Handling**:
   - Use Either/Result types everywhere - never throw exceptions
   - All template strings must be validated before processing
   - Components should gracefully degrade to basic HTML when features fail

4. **Build System**:
   - Dual compilation: library (JSR) + documentation site
   - Automatically discover and include component styles/scripts
   - Library build must be completely self-contained

### Code Style

- **Formatting**: Tabs for indentation, 80 character line limit
- **No semicolons**: Configured in deno.fmt
- **Import sorting**: Automatic with `deno task fmt`
- **TypeScript**: Strict mode with all checks enabled

### Component Development

When creating new components:

1. Extend from appropriate base class (usually `Base` or a `Thing` subclass)
2. Follow existing patterns in similar components
3. Include proper Schema.org type annotations
4. Add comprehensive tests (unit + E2E)
5. Ensure accessibility compliance

Example component structure:
```tsx
export default class MyComponent extends Base {
  static properties = ["requiredProp", "optionalProp"]
  static tag = "my-component"
  static schemaOrgType = "https://schema.org/Thing"
  
  constructor(props: MyComponentProps) {
    super(props)
  }
}
```

### Testing Requirements

- **Accessibility First**: Every component MUST have accessibility tests using @axe-core/playwright
- **Behavior Testing**: Test generated HTML output and structured data, not implementation details
- **Multiple Formats**: Test that components generate correct Schema.org, JSON-LD, and microdata output
- E2E tests for user-facing functionality
- Use property-based testing with fast-check where appropriate

### Documentation Standards

- **Live Examples**: Documentation must include working examples of all components
- **Structured Data Visibility**: Show both HTML output and generated structured data
- **Category Navigation**: Organize by component categories for easy discovery

### JSR Publication Requirements

- Maintain version in `lib/deno.json` separately from main project
- Library uses relative imports only (no aliases) for external compatibility
- Must remain zero-dependency for client-side usage
- Export patterns: default for components, named for types/constants

### Build Process

The build system supports:
- **Dual compilation**: Library for JSR + documentation site generation
- **Asset discovery**: Automatically includes component styles/scripts
- **Self-contained output**: Library build has no external dependencies
- Outputs to `/dist/` for documentation, `/lib/` published to JSR
