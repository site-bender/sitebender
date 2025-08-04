# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Deno-based semantic HTML component library (@sitebender/metadata-components) that transforms plain text into accessible, SEO-optimized content with Schema.org structured data support. The library provides both Microdata and JSON-LD output formats.

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
  - `helpers/` - Formatting helpers, language detection, template utilities
  
- **`/lib/types/`** - Metadata-specific types in correct subfolders

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