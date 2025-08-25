# @sitebender/adaptive

A library for adaptive user interfaces.


## Executive Summary

The adaptive library is a sophisticated, functional programming-based reactive DOM construction system that bridges declarative configuration and runtime DOM manipulation. It enables building progressively enhanced web applications that work without JavaScript while supporting powerful reactive calculations, validations, and conditional display logic when JavaScript is available.

**Current Status**: The core library is complete with constructors for operators, comparators, injectors, and formatters. JSX components are being created to provide a declarative interface. The JSX-to-adaptive transformer exists but needs completion.

## A. Intent and Core Philosophy

### Primary Goals

1. **Progressive Enhancement First**: Components work completely without JavaScript, with reactive features as enhancements
2. **Declarative Reactivity**: Define reactive behavior through configuration objects, not imperative code
3. **Zero Runtime Dependencies**: All operations compose at build/render time without external libraries
4. **Type-Safe Functional Programming**: Immutable data structures, pure functions, and comprehensive TypeScript types
5. **Accessibility by Default**: Built-in ARIA support, semantic HTML generation, and WCAG compliance

### Key Innovation

The library introduces a **constructor-based architecture** where every UI element, calculation, validation, and data source is represented as a configuration object. These configurations are composed functionally and can be:

- Rendered to static HTML (no JS required)
- Enhanced with reactive capabilities (when JS available)
- Serialized to JSON for storage/transmission
- Compiled from JSX for developer ergonomics

## B. Current Architecture

### 1. Constructor System

The foundation is a consistent constructor pattern across all system components:

```typescript
// Example: Operator Constructor Pattern
const Add = (datatype = "Number") => (addends = []) => ({
	tag: "Add",
	type: OPERAND_TYPES.operator,
	datatype,
	addends,
})

// Example: Comparator Constructor Pattern (NEEDS FIX - see issues)
const IsLessThan = (datatype = "Number") => (operand) => (test) => ({
	tag: "IsLessThan",
	type: OPERAND_TYPES.comparator, // Currently using "operator" - BUG!
	datatype,
	operand,
	test,
})
```

### Runtime context, bus, and state

- ComposeContext: `src/context/composeContext.ts` exposes `{ env, signal, now, bus, logger }` and is used by evaluators/hydrator.
- Event bus: `src/runtime/bus/` provides `types.ts`, `createLocalBus.ts` (CustomEvent local), and `createBroadcastBus.ts` (cross-tab via BroadcastChannel).
- State: `src/runtime/store/` exposes `createStore.ts` (tiny FRP store) and `persistToLocalStorage.ts` (SSR-friendly optional persistence).
- Docs: `src/docs/anchoring.md` shows explicit `for` overrides; `src/docs/state.md` covers store patterns.

**Constructor Categories:**

#### a. Element Constructors (`constructors/elements/`)

- Generate HTML element configurations
- Use `Filtered` higher-order function for consistent behavior
- Handle attribute filtering, ARIA attributes, ID generation
- **Status**: Complete

#### b. Operator Constructors (`constructors/operators/`)

- Mathematical and logical operations (47 total)
- Support various data types (Number, String, Date, Duration)
- **Status**: Complete
- **JSX Components Created**: 4 of 47 (Add, Subtract, Multiply, Divide)

#### c. Injector Constructors (`constructors/injectors/`)

- Define data sources for calculations
- **Status**: Missing FromCookie
- **JSX Components Created**: 3 of 10 (Constant, FromElement, FromLocalStorage)

#### d. Comparator Constructors (`constructors/comparators/`)

- Conditional logic for validations and display
- **Status**: Complete but using wrong type (OPERAND_TYPES.operator instead of .comparator)
- **JSX Components Created**: 4 of ~50 (IsEqualTo, IsLessThan, IsMoreThan, Matches)

#### e. Formatter Constructors (`constructors/formatters/`)

- Transform values for display
- **Status**: Only AsMonetaryAmount exists
- **JSX Components Created**: 0 of 1

#### f. Logical Constructors (`constructors/comparators/algebraic/`)

- Boolean logic operations
- **Status**: Complete but using wrong type
- **JSX Components Created**: 2 of 2 (And, Or)

### 2. JSX Component Layer (`lib/components/adaptive/`)

JSX components wrap the constructor functions, providing a declarative interface:

```tsx
// Developer writes:
<Add type="Number">
  <FromElement id="price" />
  <FromElement id="tax" />
</Add>

// Transforms to configuration:
{
  tag: "Add",
  type: "operator",
  datatype: "Number",
  addends: [
    { tag: "FromElement", type: "injector", source: "price", datatype: "Number" },
    { tag: "FromElement", type: "injector", source: "tax", datatype: "Number" }
  ]
}
```

### 3. Rendering Pipeline

Current SSR rendering (`ssrRenderAdaptive`) converts configurations to JSX elements with data attributes for client-side hydration.

## C. Critical Issues to Fix

### 1. Type Constants Bug

**Problem**: Comparators and logical operators use `OPERAND_TYPES.operator` instead of proper types
**Files Affected**: All comparator constructors, And/Or constructors
**Fix Required**: Update all to use `OPERAND_TYPES.comparator` or `OPERAND_TYPES.logical`

### 2. JSX Transform Incomplete

**Problem**: The jsx-to-adaptive transformer is not fully integrated
**Impact**: JSX components don't properly transform children to configurations
**Fix Required**: Complete transformer integration, ensure proper child handling

### 3. Missing JSX Components

**Problem**: Only ~13 of ~110 constructor functions have JSX component wrappers
**Impact**: Developers can't use most functionality through JSX

## D. Implementation Plan

### Phase 1: Fix Critical Bugs (Immediate)

1. **Fix OPERAND_TYPES Usage**
   - Update all comparator constructors to use `OPERAND_TYPES.comparator`
   - Update And/Or to use `OPERAND_TYPES.logical`
   - Ensure constants include all needed types

2. **Fix JSX Component Return Types**
   - Components currently use placeholder returns (`null as any`)
   - Need proper configuration object construction

### Phase 2: Complete Core JSX Components (Week 1)

#### Operators to Create (43 remaining):

**Trigonometric (12)**:

- Sine, Cosine, Tangent, Cosecant, Secant, Cotangent
- ArcSine, ArcCosine, ArcTangent
- HyperbolicSine, HyperbolicCosine, HyperbolicTangent

**Mathematical (15)**:

- AbsoluteValue, Ceiling, Floor, Round, Truncate
- Power, Root, Exponent, NaturalLog, Log, LogBaseTwo
- Modulo, Remainder, Reciprocal, Sign

**Statistical (8)**:

- Average, Mean, Median, Mode
- StandardDeviation, RootMeanSquare
- Max, Min

**Other (8)**:

- Negate, Hypotenuse, ProportionedRate, Ternary
- ArcHyperbolicSine, ArcHyperbolicCosine, ArcHyperbolicTangent

#### Comparators to Create (~46 remaining):

**Amount (2)**: IsNoLessThan, IsNoMoreThan

**Alphabetical (6)**: IsAfterAlphabetically, IsBeforeAlphabetically, IsNotAfterAlphabetically, IsNotBeforeAlphabetically, IsNotSameAlphabetically, IsSameAlphabetically

**Date (5)**: IsNotAfterDate, IsNotBeforeDate, IsNotSameDate, IsSameDate, IsAfterDate, IsBeforeDate

**DateTime (2)**: IsAfterDateTime, IsBeforeDateTime

**Equality (1)**: IsUnequalTo

**Length (8)**: IsLength, IsLongerThan, IsNoLongerThan, IsNoShorterThan, IsNotLength, IsNotSameLength, IsSameLength, IsShorterThan

**Matching (1)**: DoesNotMatch

**Numerical (3)**: IsInteger, IsPrecisionNumber, IsRealNumber

**Scalar (3)**: IsBoolean, IsNumber, IsString

**Sequence (2)**: IsAscending, IsDescending

**Set (5)**: IsDisjointSet, IsMember, IsOverlappingSet, IsSubset, IsSuperset

**Temporal (11)**: IsCalendar, IsDuration, IsInstant, IsPlainDate, IsPlainDateTime, IsPlainMonthDay, IsPlainTime, IsPlainYearMonth, IsTimeZone, IsYearWeek, IsZonedDateTime

**Time (6)**: IsAfterTime, IsBeforeTime, IsNotAfterTime, IsNotBeforeTime, IsNotSameTime, IsSameTime

**Vector (3)**: IsArray, IsMap, IsSet

#### Injectors to Create (7 remaining):

- FromApi, FromArgument, FromQueryString, FromSessionStorage
- FromUrlParameter, FromLookup, FromLookupTable
- FromCookie (needs constructor first)

#### Wrappers Needed for Non-Commutative Operations:

**Already Created**: Value, From, Amount, By, Threshold, ExpectedValue, Pattern

**Need to Create**:

- Base, Exponent (for Power)
- Date (for date comparators)
- Minuend, Subtrahend (aliases for Subtract)
- Dividend, Divisor (aliases for Divide)

### Phase 3: Complete JSX Transform (Week 2)

1. **Integrate jsx-to-adaptive.ts**
   - Hook into build pipeline
   - Ensure proper child transformation
   - Handle wrapper components correctly

2. **Update Component Implementations**
   - Remove placeholder returns
   - Properly construct configuration objects
   - Handle children transformation

### Phase 4: Client-Side Reactivity (Week 3)

1. **Complete Runtime Enhancement**
   - Implement calculation execution
   - Set up dependency tracking
   - Add event listeners

2. **Testing Infrastructure**
   - Unit tests for all components
   - Integration tests for reactivity
   - E2E tests for user interactions

### Phase 5: Documentation & Examples (Week 4)

1. **Component Documentation**
   - Document all JSX components
   - Provide usage examples
   - Create playground/demo pages

2. **Migration Guide**
   - How to convert from constructor to JSX syntax
   - Best practices
   - Common patterns

## E. Component Naming Strategy

### Semantic Wrapper Names for Non-Commutative Operations

**Mathematical Operations**:

- Subtract: `<From>` (minuend) and `<Amount>` (subtrahend)
- Divide: `<Value>` (dividend) and `<By>` (divisor)
- Power: `<Base>` and `<Exponent>`
- Modulo/Remainder: `<Value>` and `<By>`

**Comparisons**:

- Amount comparisons: `<Value>` and `<Threshold>`
- Equality: `<Value>` and `<ExpectedValue>`
- Pattern matching: `<Value>` and `<Pattern>`
- Date/Time: `<Value>` and `<Date>` or `<Time>`

**Aliases for Mathematical Precision**:

- Provide both semantic and mathematical names
- Document clearly in component JSDoc
- Example: `<Minuend>` as alias for `<From>`

## F. Technical Decisions

### 1. Type System

- All constructors should return properly typed configurations
- JSX components should have explicit return types
- Use discriminated unions for configuration types

### 2. Error Handling

- Use Either/Result types consistently
- Provide clear error messages for invalid configurations
- Validate at build time where possible

### 3. Performance

- Configurations are POJOs - no classes or prototypes
- Minimize runtime overhead
- Lazy evaluation where appropriate

## G. Next Steps Priority Order

1. **Immediate** (Today):
   - Fix OPERAND_TYPES bug in all constructors ✓
   - Update ssrRenderAdaptive to handle all types correctly ✓
   - Fix existing JSX components to return proper configs

2. **High Priority** (This Week):
   - Create remaining wrapper components
   - Implement 10 most common operators as JSX
   - Implement 10 most common comparators as JSX

3. **Medium Priority** (Next Week):
   - Complete all operator JSX components
   - Complete all comparator JSX components
   - Integrate JSX transformer

4. **Lower Priority** (Following Weeks):
   - Add more formatters
   - Implement client-side reactivity
   - Create comprehensive test suite

## H. Success Metrics

1. **Coverage**: 100% of constructors have JSX component wrappers
2. **Type Safety**: All components fully typed with no `any`
3. **Testing**: 100% unit test coverage
4. **Documentation**: Every component has examples
5. **Performance**: Sub-millisecond configuration generation
6. **Developer Experience**: IntelliSense works for all components

## Questions Resolved

1. **Q: Should constructors use different types?**
   A: Yes - comparators should use `OPERAND_TYPES.comparator`, logical should use `OPERAND_TYPES.logical`

2. **Q: How should JSX components handle children?**
   A: Through the jsx-to-adaptive transformer, which converts JSX children to configuration objects

3. **Q: What about server vs client rendering?**
   A: SSR generates HTML with data attributes, client hydrates from these attributes

## Conclusion

The adaptive library is well-architected but needs completion of the JSX component layer to be developer-friendly. With ~100 components to create and some critical bugs to fix, we have a clear path forward. The vision of declarative, progressively-enhanced reactivity without framework lock-in is compelling and achievable.

The immediate focus should be on fixing the type constants bug and creating the most commonly-used JSX components, allowing developers to start using the system while we complete the remaining components.

# lib/adaptive Production Readiness TODO List

## 🔴 CRITICAL PRIORITY - Blocking Production Release

### 1. ✅ Complete Stubbed Function Implementations

**COMPLETED 2025-08-13**: Fixed all 12 functions that were incorrectly broken with "Not implemented" errors. The implementations were already present but had been corrupted with incorrect throw statements and broken signatures.

### 1.5. ✅ Fix All Utility Functions Types and Structure

**COMPLETED 2025-08-13**: Comprehensive fixes to utilities folder:
- Fixed 75+ utility functions with proper TypeScript types and generics
- Corrected all import paths (15+ files with missing /index.ts)
- Removed unused imports from castValue utilities
- Fixed file structure (moved isDefined.ts to isDefined/index.ts)
- Created missing stringify function
- Added all string case conversion functions (toCamel, toPascal, toKebab, toSnake, toScreamingSnake, toTitle, toSentence, toTrain)
- Created toCase dispatcher function with strict CaseType typing
- Fixed generic type passing in array functions (replaceFirst, replaceLast)
- Improved toTitle with proper title case exception rules
- Only justified use of 'any' is in pipe function (with documentation)

- [x] `/utilities/getValue/index.ts` - Fixed syntax error and restored function signature
- [x] `/utilities/castValue/parseJson/index.ts` - Restored JSON parsing implementation
- [x] `/utilities/string/padEndTo/index.ts` - Restored string padding implementation
- [x] `/utilities/getValue/getFromCheckbox/index.ts` - Restored checkbox value extraction
- [x] `/utilities/getValue/getFromLocal/index.ts` - Restored local storage access
- [x] `/utilities/array/removeAll/index.ts` - Restored array element removal
- [x] `/utilities/array/replaceLast/index.ts` - Restored replace last element
- [x] `/utilities/array/none/index.ts` - Implemented none predicate (was missing)
- [x] `/utilities/array/replaceLastMatch/index.ts` - Restored replace last matching
- [x] `/utilities/array/move/index.ts` - Restored array element move
- [x] `/utilities/array/replaceFirstMatch/index.ts` - Restored replace first matching
- [x] `/utilities/array/replaceFirst/index.ts` - Restored replace first element

### 2. Establish Comprehensive Test Coverage

Current test coverage is critically low (~1% for operations):

#### Operations Testing (122 files, 1 test)

- [ ] Test all comparator operations in `/operations/comparators/`
  - [ ] Algebraic comparators (and, or)
  - [ ] Alphabetical comparators (isAfterAlphabetically, etc.)
  - [ ] Amount comparators (isLessThan, isMoreThan, etc.)
  - [ ] Date/DateTime/Time comparators
  - [ ] Equality comparators
  - [ ] Length comparators
  - [ ] Matching comparators
  - [ ] Numerical comparators
  - [ ] Scalar comparators
  - [ ] Sequence comparators
  - [ ] Set comparators
  - [ ] Temporal comparators (with native Temporal API)
  - [ ] Vector comparators

#### Operators Testing

- [ ] Test all mathematical operators in `/operations/operators/`
  - [ ] Basic arithmetic (add, subtract, multiply, divide)
  - [ ] Trigonometric functions
  - [ ] Statistical functions (mean, median, mode, etc.)
  - [ ] Advanced math functions

#### Injectors Testing

- [ ] Test all data injection mechanisms
  - [ ] FromApi
  - [ ] FromArgument
  - [ ] FromElement
  - [ ] FromLocalStorage
  - [ ] FromSessionStorage
  - [ ] FromQueryString
  - [ ] FromUrlParameter
  - [ ] FromLookup/FromLookupTable

#### Guards Testing

- [ ] Test all type guards and validators
  - [ ] Basic type guards (isBoolean, isNumber, isString, etc.)
  - [ ] Complex guards (isPhrasingContent, isFlowContent, etc.)
  - [ ] Attribute filtering guards

#### Utilities Testing

- [ ] Test all utility functions (100+ functions)
  - [ ] Array utilities
  - [ ] String utilities
  - [ ] Casting utilities
  - [ ] DOM utilities
  - [ ] Value extraction utilities

#### Rendering Testing

- [ ] Test rendering pipeline
  - [ ] buildDomTree
  - [ ] addConditionals
  - [ ] addScripts/addStylesheets
  - [ ] runCalculations
  - [ ] runFormatters

## 🟠 HIGH PRIORITY - Major Functionality Issues

### 3. Resolve TODO/FIXME Comments

#### Type System TODOs

- [ ] `/constructors/injectors/FromLookupTable/index.ts:9` - Change to proper Operand type
- [ ] `/types/index.ts:34` - Add proper Temporal types integration
- [ ] Multiple HTML element type definitions - Narrow types properly

#### Implementation TODOs

- [ ] `/rendering/constants.ts:258` - Implement transparent content model evaluation
- [ ] Guards import TODOs - Import from rendering/constants when available

### 4. Remove Hardcoded Values

#### Test Configuration

- [ ] Replace all hardcoded `https://example.com` URLs with configurable test fixtures
- [ ] Create test configuration file for common test values
- [ ] Update Deno standard library version (currently hardcoded to 0.208.0)

#### Magic Numbers

- [ ] Extract magic numbers to named constants
- [ ] Create configuration file for adjustable values

### 5. Performance Optimizations

#### Element Constructor Pattern

- [ ] Refactor repetitive `Object.assign(filteredAttrs, filterAttribute(...))` chains
- [ ] Consider builder pattern or more efficient attribute filtering

#### Dynamic Imports

- [ ] Optimize dynamic import patterns in `/operations/composers/composeOperators/index.ts`
- [ ] Consider pre-loading or caching strategies

## 🟡 MEDIUM PRIORITY - Code Quality Issues

### 6. Improve Type Safety

#### Replace Loose Types

- [ ] Replace all `unknown[]` with properly typed arrays
- [ ] Remove all `as any` type assertions in test files
- [ ] Complete type narrowing for HTML elements

#### Add Missing Type Definitions

- [ ] Complete ARIA type definitions for all elements
- [ ] Add proper return types for all functions
- [ ] Remove implicit any types

### 7. Clean Up Debug Code

- [ ] Remove commented console.log statements in `/rendering/buildDomTree/addFormatter/index.ts`
- [ ] Remove debug logging in Picture component test
- [ ] Add proper logging system if needed for development

### 8. Code Organization

#### Standardize Patterns

- [ ] Ensure consistent error handling (Either pattern) across all modules
- [ ] Standardize import ordering and grouping
- [ ] Consolidate duplicate validation logic

#### Module Structure

- [ ] Complete empty directories or remove them
- [ ] Fix broken import paths
- [ ] Ensure all modules follow the one-function-per-file pattern

## 🟢 LOW PRIORITY - Documentation & Polish

### 9. Documentation

#### Add JSDoc Comments

- [ ] Document all public APIs with JSDoc
- [ ] Add usage examples for complex functions
- [ ] Document expected error conditions

#### Update README

- [ ] Create comprehensive README for adaptive module
- [ ] Add architecture documentation
- [ ] Include usage examples

### 10. Build & Deployment

#### Build Configuration

- [ ] Verify --unstable-temporal flag is properly configured
- [ ] Ensure build process handles all file types correctly
- [ ] Add production build optimizations

#### CI/CD

- [ ] Add automated test running
- [ ] Add coverage reporting
- [ ] Add linting checks

## 📊 Completion Metrics

### Critical Items

- Function Implementations: 0/12 complete
- Test Coverage: ~1% (target: >80%)

### High Priority Items

- TODOs Resolved: 0/15+
- Hardcoded Values Removed: 0/20+
- Performance Optimizations: 0/5

### Overall Progress

- Total Tasks: ~200+
- Completed: ~90 (12 stubbed functions + 75 utility fixes + misc improvements)
- Remaining: ~110
- Estimated Effort: 3-4 weeks for critical items, 6-8 weeks total

## 🚀 Recommended Sprint Plan

### Sprint 1 (Week 1-2): ~~Stop the Bleeding~~ ✅ COMPLETED

- ✅ Complete all 12 stubbed functions
- ✅ Fix syntax errors
- ✅ Fix all utility types and imports
- [ ] Add basic smoke tests

### Sprint 2 (Week 3-4): Test Foundation

- Add comprehensive test suite for operations
- Test all injectors and guards
- Achieve 50% test coverage

### Sprint 3 (Week 5-6): Type Safety & Performance

- Resolve all TODO/FIXME items
- Replace hardcoded values
- Optimize performance bottlenecks

### Sprint 4 (Week 7-8): Quality & Polish

- Improve type safety
- Clean up debug code
- Standardize patterns

### Sprint 5 (Week 9-10): Documentation & Deployment

- Complete documentation
- Set up CI/CD
- Final production readiness review

## ⚠️ Risk Assessment

### High Risk Areas

1. **Stubbed functions** - Will cause immediate runtime failures
2. **Missing tests** - No safety net for changes
3. **Type safety issues** - Potential runtime type errors

### Mitigation Strategy

1. Priority focus on critical items
2. Incremental testing approach
3. Gradual type improvements with strict mode

---

_Last Updated: 2025-08-13_
_Generated from comprehensive codebase audit_

---

## New Findings (2025-08-24) — Action Items

These items come from a deep audit of `libraries/adaptive/src` to align with the Declarative JSX → IR plan. Do not edit `libraries/toolkit` as part of these tasks.

### 🔴 Critical
- [ ] Replace dynamic imports with explicit, tree-shakeable registries
   - [ ] Create `operations/registries/{operators,injectors,comparators}.ts`
   - [ ] Map tags to executor functions directly (no string path building, no `toCamel`, no `.js` suffixes)
   - [ ] Update `composeOperators` and `composeComparators` to use registries
- [ ] Add IR base fields and IDs to all configs
   - [ ] Add `v` (semver), `id` (stable), and optional `meta` to base config shapes (operators, injectors, comparators, logical, elements)
   - [ ] Support user-supplied `id`; otherwise generate via `generateShortId` (import from toolkit later; provide temporary local helper with a TODO to swap)
   - [ ] Ensure IDs are deterministic where possible (compiler can seed)
- [ ] Unify error monad (transition path)
   - [ ] Introduce a thin adapter so current code can return a Result-like shape
   - [ ] Leave a TODO to switch to toolkit `ResultAsync` once available; avoid expanding Either usage further

### 🟠 High
- [ ] Comparator resolution without a `comparison` field
   - [ ] Remove reliance on `operation.comparison` for import paths in `composeComparators`
   - [ ] In registry, declare category alongside executor; composers do not need `comparison` on the config
   - [ ] Update any documentation that referenced `comparison`
- [ ] SSR/CSR unification
   - [ ] Implement `rendering/index.ts` to support SSR string output and CSR hydration entry points
   - [ ] Choose MVP embed: single `<script type="application/adaptive+json" id="ir-root">…</script>` at root; document alternative per-node attributes
   - [ ] Implement `hydrate(root, ir)` that performs a single walk, attaches validators/events/formatters/calculations, then runs `runAll*`
- [ ] Environment boundary and server env guards
   - [ ] Define `ComposeContext { env, signal, now, cache, logger }` and thread as an optional param to operations
   - [ ] Add `serverEnv` and `clientEnv` adapters; DOM-only injectors return typed errors or deferrals on server
   - [ ] Document which injectors are SSR-safe (e.g., QueryString, UrlParameter with server URL) vs client-only (FromElement)
- [ ] Behavior anchoring (validation/conditional targets)
   - [ ] Implement anchor resolution: attach behaviors to nearest element with stable `id` or `name`
   - [ ] Auto-assign deterministic IDs when missing; add explicit override prop (`for` or `anchor`) in element attributes
   - [ ] Ensure `collectConditionals` and validation wiring use the resolved anchors consistently

### 🟡 Medium
- [ ] Eager vs lazy injectors
   - [ ] Add a config flag or policy to allow eager prefetch (on hydrate) vs lazy (on first use)
   - [ ] Cache/memoize injector results by (`node.id`, key) with invalidation policy
- [ ] Rendering helpers hardening
   - [ ] Remove any direct `window`/`document` references in SSR code paths; guard with env
   - [ ] Ensure `runAll*` hooks are no-ops server-side
- [ ] Import path hygiene
   - [ ] Update imports that reference moved utilities (e.g., `toCamel`) to point to toolkit later; for now, remove the dependency via registries

### 🟢 Tests & Docs
- [ ] Add “golden” tests (snapshot-style) for JSX → IR → HTML across the MVP slice
- [ ] Add smoke tests for registries (tag resolves to executor), SSR render, and hydrate wiring
- [ ] Author JSON Schema v1 (place under `libraries/adaptive/schema/v1.json`) and validate IR in dev paths
- [ ] Document registries, env adapters, anchoring, and ID/version fields in this README

Notes
- Keep `libraries/**` zero-dependency and relative-import–only. Registries must not pull from app aliases.
- Do not modify `libraries/toolkit` in this pass. Where toolkit utilities were moved (e.g., `toCamel`, `generateShortId`), add TODOs and local shims if strictly necessary; prefer removing the dependency.
