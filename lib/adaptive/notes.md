# Library Integration Analysis and Recommendations

## Current State: Three Libraries Merged Into One

This codebase consists of three distinct libraries built at different times and merged together:

1. **Adaptive Runtime Engine** (`lib/sitebender/`) - Functional HTML generation and rendering system
2. **Schema.org/Semantic Components** (`lib/components/{schema.org,semantic,calendars,formatters,parsers}`) - JSX/TSX components for structured data
3. **UI Components Library** (`lib/components/{buttons,forms,navigation,page,wrappers}`) - JSX/TSX interactive components

## Key Integration Issues and Conflicts

### 1. Two Competing Paradigms

**Adaptive Library:**

- Functional constructors: `Button(attrs)(children)`
- Configuration objects: `{ tag: "button", attributes: {...}, children: [...] }`
- Built-in validation and content model enforcement
- Sophisticated rendering pipeline with progressive enhancement hooks

**JSX/TSX Components:**

- JSX syntax: `<Button id="submit">Click me</Button>`
- createElement function converts to: `{ type: "button", props: {...} }`
- Simple string concatenation for HTML output
- Limited validation and enhancement capabilities

### 2. Type System Fragmentation

**Current Organization:**

- `lib/types/schema.org/` - Schema.org component types (well organized)
- `lib/sitebender/types/` - Adaptive library types (well organized)
- `src/types/` - UI component types (WRONG LOCATION - breaks library independence)
- Mixed imports using `~types/` alias pointing to `src/types/` (breaks in library context)

**Problems:**

- Library components incorrectly import from documentation site types
- Violates requirement that library must be self-contained
- Path aliases break when library is published to JSR

### 3. createElement Limitations

**Current createElement:**

```typescript
// Only outputs JSX elements or calls function components
// Cannot generate sitebender configuration objects
// Limited isProp support for data extraction
```

**Needed Capabilities:**

- Output mode selection (HTML string vs configuration object)
- Integration with sitebender's validation system
- Support for sitebender's enhancement hooks
- Maintain isProp functionality for JSON-LD

### 4. Missing Integration Layer

Currently no bridge between:

- JSX components → Adaptive configuration objects
- Adaptive validations → JSX component props
- JSX createElement → Adaptive rendering pipeline
- Component progressive enhancement → Adaptive hooks

## Phase 1 Completed: Type System Reorganization ✅

### What Was Done:

1. **Moved Component Types** - Copied all types from `src/types/` to `lib/types/components/`
2. **Updated All Imports** - Replaced all alias imports (`~types/`, `~components/`, `~utilities/`, `~constants/`) with relative paths
3. **Created lib/constants/** - Copied necessary constants from `src/constants/` to `lib/constants/`
4. **Fixed Adaptive Library** - Updated internal sitebender library aliases to relative paths
5. **Verified Independence** - Confirmed zero remaining alias imports in lib/

### Files Updated:

- **67 files** with utilities imports converted to relative paths
- **32 files** with types imports converted to relative paths
- **20+ files** with components imports converted to relative paths
- **900+ import statements** in sitebender library converted to relative paths

The library is now **completely self-contained** with only relative imports, making it ready for JSR publication.

### Known Issues to Address

#### JSX Type Definitions (High Priority)
The current JSX type definitions in `lib/types/globals.d.ts` and `lib/types/JSX/` are incomplete. Components are using JSX namespace types like `JSX.FormHTMLAttributes<HTMLFormElement>` that don't exist in our definitions. This causes TypeScript errors but doesn't prevent the code from working.

**Current State:**
- Basic JSX.Element and JSX.IntrinsicElements defined in globals.d.ts
- Missing HTML element attribute interfaces (FormHTMLAttributes, ButtonHTMLAttributes, etc.)
- Two different type systems in play (sitebender's type system vs JSX component types)

**Needs Investigation:**
- Consolidate JSX type definitions from other libraries
- Decide between extending React-style types or creating custom minimal types
- Ensure compatibility with both sitebender and JSX component systems

---

## Remaining Phases (To Be Discussed)

### Phase 2: Unified createElement Strategy

Create a dual-mode createElement that can output both HTML strings and sitebender configurations:

```typescript
// lib/utilities/createElement/index.ts
export function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	const mode = globalConfig.renderMode || "html" // 'html' | 'sitebender'

	if (mode === "sitebender") {
		return createAdaptiveConfig(tag, props, children)
	}

	return createHTMLElement(tag, props, children)
}

// Adaptive configuration generation
function createAdaptiveConfig(tag, props, children) {
	// Map JSX to sitebender constructor
	const Constructor = getAdaptiveConstructor(tag)
	if (Constructor) {
		return Constructor(props)(children)
	}
	// Fallback for unknown elements
	return { tag, attributes: props, children }
}
```

### 2. Type System Reorganization

**Move all component types to lib/types/:**

```
lib/types/
├── schema.org/          # Existing schema.org types
├── components/          # NEW - consolidated from src/types/
│   ├── forms/
│   ├── navigation/
│   ├── buttons/
│   ├── page/
│   └── wrappers/
├── jsx/                 # JSX element types
├── temporal/            # Date/time types
└── index.ts            # Central export point
```

**Fix all imports in lib/ components:**

- Replace `~types/` with relative imports
- Ensure no dependencies on src/

### 3. Component Integration Layer

Create adapters between JSX components and sitebender system:

```typescript
// lib/components/adapters/index.ts

// Convert JSX component to sitebender constructor
export function adaptComponent(Component: Function) {
	return (props: any) => (children: any[]) => {
		// Get JSX representation
		const jsx = Component({ ...props, children })

		// Convert to sitebender config with validation
		return convertToAdaptive(jsx)
	}
}

// Add sitebender features to JSX components
export function enhanceComponent(Component: Function) {
	return (props: any) => {
		// Add validation
		const validated = validateProps(props)

		// Add enhancement hooks
		const enhanced = {
			...validated,
			calculations: props.calculations,
			formatters: props.formatters,
			conditionals: props.conditionals,
		}

		return Component(enhanced)
	}
}
```

### 4. Progressive Migration Path

**Phase 1: Fix Type Organization**

- Move src/types/ to lib/types/components/
- Update all imports to use relative paths
- Ensure library is self-contained

**Phase 2: Dual-Mode createElement**

- Extend createElement to support sitebender output
- Add mode configuration
- Maintain backward compatibility

**Phase 3: Component Adapters**

- Create adapters for existing JSX components
- Add validation layer
- Enable progressive enhancement hooks

**Phase 4: Unified API**

- Single component API supporting both paradigms
- Automatic mode detection based on context
- Full feature parity between modes

### 5. Benefits of Integration

**For Developers:**

- Write components once using familiar JSX
- Get sitebender's validation and enhancement for free
- Choose rendering mode based on use case
- Type safety across entire system

**For End Users:**

- Better HTML5 compliance through validation
- Progressive enhancement built-in
- Smaller bundle sizes with shared infrastructure
- Consistent behavior across components

### 6. Component Architecture Alignment

**Standardize component patterns:**

```typescript
// All components follow same structure
export default function MyComponent(props: Props) {
	// Validation
	const validated = validateProps(props)

	// Core rendering
	const element = <div {...validated}>{props.children}</div>

	// Enhancement hooks (if in sitebender mode)
	if (isAdaptiveMode()) {
		return enhanceWithAdaptive(element, props)
	}

	return element
}

// Props always exported as named export
export type Props = {
	// Component-specific props
}
```

### 7. Validation and Content Model Integration

Leverage sitebender's sophisticated content model validation:

```typescript
// lib/components/guards/jsx/index.ts

export function validateJSXChildren(
	element: string,
	children: unknown[],
): unknown[] {
	const filter = getContentModelFilter(element)
	return filter ? filter(children) : children
}

// Use in createElement
function createElement(tag, props, ...children) {
	const validatedChildren = validateJSXChildren(tag, children)
	// Continue with validated children
}
```

### 8. Configuration Storage Format

For database/file storage of component configurations:

```typescript
// Adaptive configuration format (JSON-serializable)
{
  "type": "sitebender:component",
  "version": "1.0",
  "component": "Button",
  "props": {
    "id": "submit-btn",
    "class": "primary",
    "calculations": [{
      "target": "disabled",
      "operation": {
        "type": "FromLocalStorage",
        "key": "userLoggedIn",
        "transform": "not"
      }
    }]
  },
  "children": [
    { "type": "TextNode", "value": "Submit" }
  ]
}
```

## Summary

The three libraries have excellent individual architectures but need integration work:

1. **Adaptive** provides sophisticated validation and rendering
2. **JSX components** provide familiar developer experience
3. **Integration layer** will unite them for maximum benefit

The key is creating a bridge that preserves the strengths of each approach while enabling them to work together seamlessly. This will require careful refactoring of the createElement function, reorganization of types, and creation of adapter layers, but will result in a more powerful and cohesive library.

---

# Adaptive Library Analysis

## Overview

The `lib/sitebender/` library is a sophisticated **functional HTML generation and rendering system** designed to create dynamic, reactive web applications through declarative configuration objects. It serves as the foundational infrastructure for the main @sitebender/sitebender library.

## Core Purpose

The sitebender library provides:

1. **Declarative HTML Element Construction** - Creates HTML elements through functional composition rather than imperative DOM manipulation
2. **Advanced Content Model Validation** - Enforces HTML5 content model rules with sophisticated filtering
3. **Dynamic Value Injection and Operations** - Supports complex mathematical operations, data injection from various sources, and reactive updates
4. **Server-Side and Client-Side Rendering** - Can render to both static HTML strings and live DOM trees
5. **Progressive Enhancement Pipeline** - Provides hooks for calculations, formatting, conditionals, and client-side enhancements

## Architecture Components

### 1. Element Construction System (`constructors/`)

- **HTML Element Constructors**: All standard HTML elements (Button, Div, Form, etc.) with proper typing
- **Abstracted Base Patterns**:
  - `Filtered` - Elements with filtered children
  - `FilteredAllowText` - Elements allowing text nodes and filtered children
  - `FilteredEmpty` - Self-closing elements with filtered attributes
  - `GlobalEmpty` - Self-closing elements with global attributes only
  - `GlobalOnly` - Elements with global attributes and any children
- **Constructor Signature**: `Tag(attributes)(children) => ConfigObject`

### 2. Advanced Content Model Validation (`guards/`)

Sophisticated filtering system enforcing HTML5 content models:

- **Phrasing Non-Interactive Filter**: For Button/Label - allows phrasing content, excludes interactive
- **Flow Non-Interactive Filter**: For A elements - allows flow content, excludes interactive elements
- **Details Content Filter**: Smart reorganization moving Summary elements to first position
- **Self-Excluding Filter**: For Form/Address preventing nested instances
- **Legend Content Filter**: Allows phrasing OR heading content with exclusions
- **Custom Filters**: Table cells, Select options, Ruby annotations, etc.

### 3. Operations Engine (`operations/`)

#### Operators (Mathematical/Logical)

- **Arithmetic**: Add, Subtract, Multiply, Divide, Modulo, Power, etc.
- **Trigonometric**: Sine, Cosine, Tangent, ArcSine, Hyperbolic functions, etc.
- **Statistical**: Average, Mean, Median, Mode, StandardDeviation, etc.
- **Rounding**: Floor, Ceiling, Round, Truncate

#### Comparators

- **Equality**: IsEqualTo, IsUnequalTo
- **Numerical**: IsLessThan, IsMoreThan, IsNoLessThan, IsNoMoreThan
- **String**: IsAfterAlphabetically, IsBeforeAlphabetically, IsSameAlphabetically
- **Temporal**: IsAfterDate, IsBeforeDate, IsSameDate (Date/DateTime/Time variants)
- **Set Operations**: IsMember, IsSubset, IsSuperset, IsDisjointSet, IsOverlappingSet
- **Length**: IsLength, IsLongerThan, IsShorterThan, IsSameLength
- **Type Guards**: IsBoolean, IsNumber, IsString, IsInteger, IsPrecisionNumber
- **Algebraic**: And, Or combinations

#### Composers

- `composeOperators` - Chains mathematical operations
- `composeComparators` - Combines comparison operations
- `composeConditional` - Creates conditional logic trees
- `composeValidator` - Builds validation pipelines

### 4. Data Injection System (`injectors/`)

Multiple data sources for dynamic content:

- **Constant**: Static values
- **FromApi**: Fetch data from APIs
- **FromElement**: Extract values from DOM elements
- **FromLocalStorage/SessionStorage**: Browser storage
- **FromQueryString**: URL query parameters
- **FromUrlParameter**: URL path segments or patterns
- **FromLookup**: Single key-value lookups
- **FromLookupTable**: Multi-key lookup tables
- **FromArgument**: Function arguments (for operations)

All injectors return `Either<Error[], T>` for robust error handling.

### 5. Rendering Pipeline (`rendering/`)

Multi-stage rendering process:

1. **buildDomTree**: Core DOM construction
   - `addAttributes` - Applies HTML attributes
   - `addDataAttributes` - Adds data-* attributes
   - `addCalculation` - Attaches calculation hooks
   - `addFormatter` - Attaches formatting functions
   - `addValidation` - Adds validation logic
   - `appendChildren` - Recursively builds child elements

2. **renderTo**: Main rendering orchestrator
   - Collects and deduplicates stylesheets/scripts
   - Converts selectors to unique IDs
   - Builds the DOM tree
   - Adds conditionals for show/hide logic
   - Runs calculations and formatters
   - Executes display callbacks

3. **Enhancement Hooks**:
   - `runAllCalculations` - Executes attached calculations
   - `runAllFormatters` - Applies formatting transformations
   - `runAllDisplayCallbacks` - Handles conditional visibility

## Integration with Main Library

The sitebender library provides the foundation for the semantic components:

1. **Base Infrastructure**: All semantic components extend sitebender's constructor patterns
2. **Content Validation**: Advanced filters ensure semantic HTML validity
3. **Progressive Enhancement**: Hooks for client-side behavior and formatting
4. **Rendering**: Converts semantic configurations to HTML/DOM

## Key Design Patterns

### Functional Programming

- **Curried Functions**: All constructors use currying for partial application
- **Either Monad**: Comprehensive error handling without exceptions
- **Pure Functions**: No side effects during construction
- **Composition**: Complex behaviors built from simple operations

### HTML5 Compliance

- **Content Model Enforcement**: Automatic filtering of invalid children
- **Smart Reorganization**: Elements can reorganize children (e.g., Details/Summary)
- **Self-Exclusion**: Prevents invalid nesting (e.g., Form within Form)

### Progressive Enhancement

- **Configuration-First**: Declarative configuration objects
- **Multi-Stage Rendering**: Separate construction and enhancement phases
- **Hook System**: Extensible attachment points for behavior

### Type Safety

- **Comprehensive Types**: Full HTML element and attribute typing
- **Runtime Validation**: Guards beyond compile-time checks
- **Content Categories**: Proper typing for flow/phrasing/metadata content

### Async-First Design

- **Promise-Based**: All operations support async resolution
- **Nested Composition**: Complex operations flatten efficiently
- **Error Aggregation**: Multiple errors collected and reported

## Usage Example

```typescript
// Create a button with dynamic content
const submitButton = Button({
	id: "submit",
	class: "primary",
	disabled: FromLocalStorage("userLoggedIn").map((v) => !v),
})([
	TextNode("Submit"),
	Span({ class: "count" })([
		TextNode("("),
		FromApi("/api/pending-count"),
		TextNode(")"),
	]),
])

// Render to DOM with enhancements
await renderTo(document.body)(submitButton)
```

## File Organization

The library follows strict patterns:

- One function/component per file
- Folder names indicate the export (PascalCase for components, camelCase for functions)
- All folders contain `index.ts` or `index.tsx`
- Hierarchical nesting based on usage patterns
- Helper functions nested within their parent's folder

## Testing

Comprehensive test coverage includes:

- Unit tests for individual operations and constructors
- Integration tests for composed operations
- Property-based testing for mathematical operations
- Validation tests for content model enforcement
