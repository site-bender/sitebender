# Architect and Pagewright Libraries: Architectural Analysis

> **Analysis Date**: 2025-09-29
> **Status**: Current implementation review and architectural recommendations
> **Purpose**: Document the intended vs actual relationship between Architect and Pagewright libraries
> **UX Philosophy**: Great tools make people feel smart and capable, not confused by poor organization

## Executive Summary

Sitebender Studio represents a paradigm shift toward "everything is data" - where entire applications (including JavaScript behaviors) compile to data structures that can be stored in databases, distributed via IPFS, and rendered universally. The Architect and Pagewright libraries form the core of this vision, but current implementations have blurred architectural boundaries that need cleanup to achieve the elegant separation described in their documentation.

## What Sitebender Studio Does

**Sitebender Studio** is a revolutionary web framework built on a radical premise: **everything is data**. Rather than traditional approaches where applications are code that manipulates data, Sitebender treats the entire application—including all JavaScript functionality, UI components, validation rules, and behaviors—as data structures that can be:

- **Authored** in JSX (but not React JSX)
- **Compiled** to an Internal Representation (IR) 
- **Persisted** as JSON, YAML, TOML, or RDF Turtle in databases/triple stores
- **Distributed** via CRDTs and IPFS for peer-to-peer sharing
- **Rendered** directly to DOM without a virtual DOM
- **Validated** using SHACL/OWL2 semantic constraints

### Core Philosophy

**"The future doesn't need the past's mistakes"** - this is explicitly not for migrating from React or patching legacy systems, but for building entirely new applications using data-centric, distributed-by-default architecture.

### Key Revolutionary Aspects

- **Zero runtime dependencies** (except Arborist uses SWC for parsing)
- **Deno + TypeScript only** - no Node.js, no bundling
- **Applications as tradeable data** - behaviors can be cryptographically verified and shared
- **Triple store as single source of truth** - everything persists in RDF
- **AI-safe governance** via Warden contracts
- **Cryptographic contracts** for architectural enforcement

## What Pagewright Does (Intended Architecture)

**Pagewright** is the **semantic HTML foundation layer** that provides:

### 1. Standards-Compliant Element Wrappers

- **Typed wrappers for HTML, SVG, MathML, ChemML elements** that enforce W3C/WHATWG standards at compile time
- **Automatic substitution**: Build process converts `<div>` → `<Div>` with proper TypeScript validation
- **Content model enforcement**: Prevents invalid nesting (like `<a>` inside `<a>`)
- **Attribute validation**: Only allows valid attributes per element specification

### 2. Semantic Component Library

Over 1000+ semantic components organized by purpose:
- **Document Structure**: `Article`, `Section`, `Heading`, `Abstract`, `Bibliography`
- **Interactive Components**: `Form`, `TextField`, `BooleanField`, `Button`  
- **Scientific Components**: `MathMLDisplay`, `ChemMLDisplay`, `MusicXMLDisplay`
- **Schema.org Components**: Rich metadata for SEO and structured data
- **Voice Interface**: SSML generation for accessibility

### 3. Progressive Enhancement Foundation

- **Build-time compilation**: JSX → pure HTML (no runtime needed)
- **Works without JavaScript**: Forms submit, links navigate, buttons click
- **Opt-in enhancement** via `data-*` attributes
- **Three-layer architecture**: Semantic HTML → CSS styling → JavaScript enhancement

## What Architect Does (Intended Architecture)

**Architect** is the **reactive behavior composition layer** that extends Pagewright with:

### 1. Data-Driven Behaviors

Everything reactive is expressed as **composable data structures**:

```jsx
<Display id="total">
  <Add>
    <From.Element selector="#price" />
    <From.Element selector="#tax" />
  </Add>
</Display>
```

This compiles to JSON that can be:
- Stored in databases
- Validated on server and client identically  
- Generated as SHACL constraints
- Executed as JavaScript functions

### 2. Component Categories

- **Injectors** (leaf nodes): `From.Constant`, `From.Element`, `From.API`
- **Operators** (branch nodes): `Add`, `Multiply`, `Average`, trigonometric functions
- **Comparators**: `IsLessThan`, `Matches`, `InSet` (with `Referent`/`Comparand` children)
- **Logical**: `And`, `Or`, `Not`
- **Display**: `ShowIf`, `HideIf`, `SwitchDisplay`
- **Formatters**: `As.Date`, `As.Currency`, `As.Percentage`

### 3. Revolutionary Form Philosophy

**Forms are about data types, not widgets**:

```jsx
// ❌ Traditional: developer picks widgets
<RadioGroup name="role" />
<Select name="country" />

// ✅ Architect: system picks optimal widgets based on data
<ChooseOneField name="role" of={["admin", "user"]} /> // → radio (≤6 items)
<ChooseOneField name="country" of={countries} />      // → select (>6 items)
```

### 4. Behavior Attachment

Behaviors attach as DOM properties:
```javascript
element.__sbCalculate  // Async calculation function
element.__sbValidate   // Async validation function  
element.__sbFormat     // Async formatting function
```

## How They Should Work Together (Intended Design)

### The Perfect Workflow

1. **Pagewright provides semantic foundation** - HTML structure, accessibility, forms
2. **Architect adds reactive behaviors** - calculations, validations, formatting
3. **Everything compiles to data** - stored in triple stores, distributed via IPFS
4. **Universal execution** - same logic works client, server, database constraints

### Example Integration

```jsx
import EmailField from "@sitebender/pagewright/interact/forms/fields/EmailField/index.tsx"
import Validation from "@sitebender/architect/components/validation/Validation/index.tsx" 
import Matches from "@sitebender/architect/components/comparators/matching/Matches/index.tsx"

<EmailField name="email">
  <Validation>
    <Matches>
      <Referent><From.Argument /></Referent>
      <Comparand><From.Constant>^[^@]+@[^@]+$</From.Constant></Comparand>
    </Matches>
  </Validation>
</EmailField>
```

This creates a semantically correct email field (Pagewright) with reactive validation (Architect) that compiles to data and works identically on client and server.

## The Current "Mess" - Architectural Issues

### 1. Blurred Boundaries

Looking at the actual implementations:

- **Pagewright has `transform/` directory** with Architect-like components (comparators, operators, injectors)
- **Architect has `constructors/elements/`** with HTML element constructors
- **Overlapping functionality**: Both have similar validation and calculation components

**Evidence:**
- `libraries/pagewright/src/transform/` contains comparators, operators, injectors
- `libraries/architect/src/constructors/elements/` contains HTML element constructors
- Both libraries have duplicate functionality for validation and calculations

### 2. Inconsistent Component Organization

- **Pagewright should focus on semantic HTML** but has reactive transform components
- **Architect should focus on behaviors** but has HTML constructors
- **No clear separation of concerns** between semantic markup and reactive behaviors

### 3. Different Implementation Approaches

- **Pagewright**: More JSX-focused, build-time oriented
- **Architect**: More constructor-function oriented, runtime-focused
- **Inconsistent patterns** make integration complex

### 4. Documentation vs Reality Gap

- **READMEs describe clean separation** between foundation and behavior layers
- **Actual code shows significant overlap** and confusion
- **Missing clear integration points** between the libraries

## Specific Implementation Problems

### Pagewright Issues

**Directory: `libraries/pagewright/src/transform/`**
- Contains comparators (`And`, `Or`, `IsEqualTo`, `Matches`)
- Contains operators (`Add`, `Multiply`, `Divide`, `Average`)
- Contains injectors (`FromElement`, `FromConstant`, `FromAPI`)
- Contains logical components (`And`, `Or`)

**Problem**: These are Architect's domain, not Pagewright's semantic HTML concerns.

### Architect Issues

**Directory: `libraries/architect/src/constructors/elements/`**
- Contains HTML element constructors (`Audio`, `Select`, `Meta`, `Dialog`)
- Contains form element constructors
- Contains metadata constructors

**Problem**: These are Pagewright's domain, not Architect's behavior concerns.

## Recommendations for Architectural Cleanup

### 1. Clear Separation of Concerns

```
Pagewright (Foundation Layer):
├── Semantic HTML elements (div, form, input)
├── Accessible components (Article, Form, Button)  
├── Schema.org structured data
├── Build-time JSX → HTML compilation
└── Progressive enhancement hooks (data-* attributes)

Architect (Behavior Layer):
├── Reactive calculations (Add, Multiply, From.Element)
├── Validation logic (IsInteger, Matches, And)
├── Display control (ShowIf, SwitchDisplay)
├── Data transformations and formatting
└── Runtime behavior attachment (__sbCalculate, __sbValidate)
```

### 2. Specific Cleanup Actions

#### Move from Pagewright to Architect:
- `libraries/pagewright/src/transform/comparators/*` → `libraries/architect/src/components/comparators/`
- `libraries/pagewright/src/transform/operators/*` → `libraries/architect/src/components/operators/`
- `libraries/pagewright/src/transform/injectors/*` → `libraries/architect/src/components/injectors/`
- `libraries/pagewright/src/transform/logical/*` → `libraries/architect/src/components/logical/`

#### Remove from Architect:
- `libraries/architect/src/constructors/elements/*` → Use Pagewright components instead
- Consolidate HTML construction with Pagewright's typed wrappers

### 3. Clean Integration Points

- **Pagewright components accept `children`** for Architect behaviors
- **Architect behaviors compile to `data-*` attributes** for Pagewright enhancement
- **Shared type system** for seamless composition

### 4. Consistent Architecture

- **Both libraries compile to data** (JSON/YAML/Turtle)
- **Both support the JSX → IR → Storage → Render pipeline**
- **Architect imports from Pagewright**, never the reverse
- **Single source of truth** for each architectural concern

## Benefits of Proper Separation

### 1. Clear Mental Model
- Developers understand which library handles which concerns
- Easier onboarding and documentation
- Reduced cognitive overhead

### 2. Better Maintainability
- Changes to HTML semantics only affect Pagewright
- Changes to reactive behaviors only affect Architect
- No duplicate code to maintain

### 3. True Progressive Enhancement
- Pagewright components work standalone (semantic HTML)
- Architect behaviors enhance existing semantic components
- Clear dependency chain (Architect depends on Pagewright, not vice versa)

### 4. AI-Safe Development
- Warden can better enforce architectural boundaries
- Clear contracts between layers
- Reduced surface area for mistakes

## Implementation Priority

### Phase 1: Assessment
- [ ] Audit all overlapping components
- [ ] Map current usage patterns
- [ ] Identify breaking changes

### Phase 2: Consolidation  
- [ ] Move reactive components from Pagewright to Architect
- [ ] Remove HTML constructors from Architect
- [ ] Update imports across codebase

### Phase 3: Integration
- [ ] Establish clean integration patterns
- [ ] Update documentation to match reality
- [ ] Add Warden contracts for architectural enforcement

## Conclusion

The vision behind Sitebender's architecture is sound and revolutionary. The "everything is data" approach, combined with clean separation between semantic foundation (Pagewright) and reactive behaviors (Architect), could indeed represent a fundamental leap forward in web development.

However, the current implementation has drifted from this clean architecture, creating overlap and confusion. By cleaning up these boundaries and eliminating duplicate functionality, we can restore the elegant separation that makes this system so powerful.

Once properly organized, this architecture enables:
- **Universal validation** (client, server, database)
- **Applications as data** (tradeable, verifiable, distributable)
- **True progressive enhancement** (works without JS, enhanced with it)
- **AI-safe development** (clear contracts, no escape hatches)

The cleanup effort will be significant but essential for realizing the full potential of this revolutionary approach to web application development.
