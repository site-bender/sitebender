# @sitebender Adaptive Library - Comprehensive Analysis and Implementation Plan

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
