# Toolsmith-Architect Integration Design

**Status**: Design Document
**Created**: 2025-10-06
**Purpose**: Define how Toolsmith's branded types and monadic functions integrate with Architect's behavior composition system

## Overview

This document specifies how Architect's JSX-based behavior composition system will use Toolsmith's type-safe, monadic arithmetic and logical operations. The integration must support:

1. **Curried functions** that return thunks/IO for lazy evaluation
2. **Branded types** for compile-time type safety
3. **Monadic error handling** via `Result<ValidationError, T>`
4. **Multiple execution contexts**: server/client, eager/lazy
5. **Array overloads** for commutative numeric operations

## JSX Component Structure

### Typed Components

All operations use typed component names that directly map to Toolsmith functions:
- `<AddToTwoDecimalPlaces>` → `addToTwoDecimalPlaces`
- `<SubtractIntegers>` → `subtractIntegers`
- `<MultiplyRealNumbers>` → `multiplyRealNumbers`

### Numeric Operations

**Binary form (all numeric operations):**
```tsx
<AddToTwoDecimalPlaces>
  <Augend>
    <FromElement selector="#price" />
  </Augend>
  <Addend>
    <Value>19.99</Value>
  </Addend>
</AddToTwoDecimalPlaces>

<SubtractIntegers>
  <Minuend>
    <FromArgument />
  </Minuend>
  <Subtrahend>
    <Value>5</Value>
  </Subtrahend>
</SubtractIntegers>
```

**N-ary form (commutative numeric only: Add, Multiply):**
```tsx
<AddToTwoDecimalPlaces>
  <Addends>
    <FromElement selector="#item1" />
    <FromElement selector="#item2" />
    <FromElement selector="#item3" />
  </Addends>
</AddToTwoDecimalPlaces>

<MultiplyIntegers>
  <Multiplicands>
    <FromLocalStorage key="quantity" />
    <FromPathSegment segment="multiplier" />
    <Value>2</Value>
  </Multiplicands>
</MultiplyIntegers>
```

### Logical Operations (Array-Only)

Logical operations (`And`, `Or`, `Xor`) only accept array form:

```tsx
<And>
  <Predicates>
    <IsGreaterThan>
      <Referent>
        <FromElement selector="#age" />
      </Referent>
      <Comparand>
        <Value>18</Value>
      </Comparand>
    </IsGreaterThan>
    <IsLessThan>
      <Referent>
        <FromElement selector="#age" />
      </Referent>
      <Comparand>
        <Value>65</Value>
      </Comparand>
    </IsLessThan>
  </Predicates>
</And>
```

### Set Operations (Binary Only)

Set operations (`Union`, `Intersection`) only accept binary form:

```tsx
<Union>
  <SetA>
    <FromElement selector="#tags1" />
  </SetA>
  <SetB>
    <FromElement selector="#tags2" />
  </SetB>
</Union>
```

## Internal Representation (IR)

### Binary Numeric Operation
```typescript
{
  tag: "AddToTwoDecimalPlaces",
  operands: [
    { tag: "FromElement", selector: "#price", returns: "TwoDecimalPlaces" },
    { tag: "Value", value: 19.99, returns: "TwoDecimalPlaces" }
  ],
  returns: "TwoDecimalPlaces"
}
```

### N-ary Numeric Operation
```typescript
{
  tag: "AddToTwoDecimalPlaces",
  operands: [
    { tag: "FromElement", selector: "#item1", returns: "TwoDecimalPlaces" },
    { tag: "FromElement", selector: "#item2", returns: "TwoDecimalPlaces" },
    { tag: "FromElement", selector: "#item3", returns: "TwoDecimalPlaces" }
  ],
  returns: "TwoDecimalPlaces"
}
```

### Logical Operation
```typescript
{
  tag: "And",
  operands: [
    { tag: "IsGreaterThan", /* ... */, returns: "boolean" },
    { tag: "IsLessThan", /* ... */, returns: "boolean" }
  ],
  returns: "boolean"
}
```

## Composition Strategy

The `composeOperators` function handles different operation types:

```typescript
function composeOperators(ir) {
  const { tag, operands } = ir
  const operatorFn = await import(`@sitebender/toolsmith/${getPath(tag)}`)
  const operandThunks = operands.map(op => composeInjector(op))
  
  return (arg, localValues) => {
    const values = operandThunks.map(thunk => thunk(arg, localValues))
    
    // Logical operations (and, or, xor) - pass array directly
    if (tag === 'And' || tag === 'Or' || tag === 'Xor') {
      return operatorFn.default(values) // Array<boolean> → Result<ValidationError, boolean>
    }
    
    // Set operations (union, intersection) - binary curry
    if (tag === 'Union' || tag === 'Intersection') {
      const fn = operatorFn.default(values[0])
      return fn(values[1]) // Result<ValidationError, Set<T>>
    }
    
    // Numeric operations
    if (values.length === 2) {
      // Binary curry
      const fn = operatorFn.default(values[0])
      return fn(values[1]) // Result<ValidationError, T>
    } else {
      // N-ary (commutative only: Add, Multiply)
      return operatorFn.default(values) // Array<T> → Result<ValidationError, T>
    }
  }
}

function getPath(tag) {
  // "AddToTwoDecimalPlaces" -> "newtypes/twoDecimalPlaces/addToTwoDecimalPlaces"
  // "SubtractIntegers" -> "newtypes/integer/subtractIntegers"
  // "And" -> "logic/and"
  // "Union" -> "set/union"
}
```

## Toolsmith Function Signatures

### Numeric Operations Requiring Array Overload

Only **commutative numeric operations** need array overload:

```typescript
// addToTwoDecimalPlaces/index.ts
export default function addToTwoDecimalPlaces(
  augend: TwoDecimalPlaces | Array<TwoDecimalPlaces>,
): 
  | ((addend: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces>)
  | Result<ValidationError, TwoDecimalPlaces> 
{
  // Array case
  if (Array.isArray(augend)) {
    if (augend.length === 0) {
      return error({
        code: "EMPTY_ARRAY",
        field: "augend",
        messages: ["System needs at least one value to add"],
        received: augend,
        expected: "Non-empty array of TwoDecimalPlaces",
        suggestion: "Provide at least one TwoDecimalPlaces value",
        severity: "requirement",
      })
    }
    
    if (augend.length === 1) {
      return ok(augend[0])
    }
    
    // Reduce with error propagation
    let accumulator = augend[0]
    for (let i = 1; i < augend.length; i++) {
      const result = addToTwoDecimalPlaces(accumulator)(augend[i])
      if (result.isError) return result
      accumulator = result.value
    }
    return ok(accumulator)
  }
  
  // Binary curry
  return function addToAugend(addend: TwoDecimalPlaces) {
    const SCALE_FACTOR = 100
    const augendRaw = unwrapTwoDecimalPlaces(augend)
    const addendRaw = unwrapTwoDecimalPlaces(addend)
    
    const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
    const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
    const resultScaled = augendScaled + addendScaled
    const resultRaw = resultScaled / SCALE_FACTOR
    
    return twoDecimalPlaces(resultRaw)
  }
}
```

**Functions needing array overload (~14 total):**
- Per branded type (7 types): `addIntegers`, `addToTwoDecimalPlaces`, `addToOneDecimalPlace`, `addToThreeDecimalPlaces`, `addToFourDecimalPlaces`, `addToEightDecimalPlaces`, `addRealNumbers`
- Per branded type (7 types): `multiplyIntegers`, `multiplyToTwoDecimalPlaces`, etc.

### Numeric Operations NOT Requiring Overload

**Non-commutative operations (binary curry only):**

```typescript
// subtractToTwoDecimalPlaces/index.ts
export default function subtractToTwoDecimalPlaces(
  minuend: TwoDecimalPlaces,
): (subtrahend: TwoDecimalPlaces) => Result<ValidationError, TwoDecimalPlaces> {
  return function subtractFromMinuend(subtrahend: TwoDecimalPlaces) {
    // ... implementation
  }
}
```

**Operations:** `subtract`, `divide`, `power`, `root` (across all numeric types)

### Logical Operations (Array-Only, No Overload)

```typescript
// and/index.ts
export default function and(
  predicates: Array<boolean>
): Result<ValidationError, boolean> {
  if (predicates.length === 0) {
    return error({
      code: "EMPTY_ARRAY",
      field: "predicates",
      messages: ["System needs at least one predicate to evaluate"],
      received: predicates,
      expected: "Non-empty array of boolean values",
      suggestion: "Provide at least one boolean predicate",
      severity: "requirement",
    })
  }
  
  return ok(predicates.every(p => p))
}
```

**Operations:** `and`, `or`, `xor`

### Set Operations (Binary Curry, No Overload)

```typescript
// union/index.ts
export default function union<T>(
  setA: Set<T>
): (setB: Set<T>) => Result<ValidationError, Set<T>> {
  return function unionWithSetA(setB: Set<T>) {
    return ok(new Set([...setA, ...setB]))
  }
}
```

**Operations:** `union`, `intersection`

## Execution Contexts

All four execution contexts work identically:

### Server-Side Eager (SSR)
```typescript
const calculationFn = composeOperators(irTree)
const result = calculationFn(null, {}) // Execute immediately
// result: Result<ValidationError, TwoDecimalPlaces>
// Render error or value to HTML
```

### Server-Side Lazy (Deferred)
```typescript
const calculationFn = composeOperators(irTree)
element.__sbCalculate = calculationFn // Attach to element
// Serialize to client for later execution
```

### Client-Side Eager (Progressive Enhancement)
```typescript
const result = element.__sbCalculate(null, {})
if (result.isError) {
  displayError(result.error.messages[0])
} else {
  displayValue(result.value)
}
```

### Client-Side Lazy (Event-Driven)
```typescript
element.addEventListener('input', () => {
  const result = element.__sbCalculate(null, {})
  updateDOM(result)
})
```

## Complete Example

```tsx
<Calculation>
  <And>
    <Predicates>
      <IsGreaterThan>
        <Referent>
          <MultiplyToTwoDecimalPlaces>
            <Multiplicand>
              <AddToTwoDecimalPlaces>
                <Addends>
                  <FromElement selector="#price1" />
                  <FromElement selector="#price2" />
                  <FromElement selector="#price3" />
                </Addends>
              </AddToTwoDecimalPlaces>
            </Multiplicand>
            <Multiplier>
              <Value>1.1</Value>
            </Multiplier>
          </MultiplyToTwoDecimalPlaces>
        </Referent>
        <Comparand>
          <Value>100.00</Value>
        </Comparand>
      </IsGreaterThan>
      <IsLessThan>
        <Referent>
          <FromElement selector="#quantity" />
        </Referent>
        <Comparand>
          <Value>10</Value>
        </Comparand>
      </IsLessThan>
    </Predicates>
  </And>
</Calculation>
```

**Composes to:** `((price1 + price2 + price3) × 1.1 > 100) && (quantity < 10)`

**Returns:** `Result<ValidationError, boolean>`

## Summary

| Operation Type | Form | Overload Needed | Example |
|---------------|------|-----------------|---------|
| Numeric Commutative | Binary or N-ary | ✅ Yes | `addToTwoDecimalPlaces`, `multiplyIntegers` |
| Numeric Non-Commutative | Binary only | ❌ No | `subtractToTwoDecimalPlaces`, `divideIntegers` |
| Logical | Array only | ❌ No | `and`, `or`, `xor` |
| Set | Binary only | ❌ No | `union`, `intersection` |

**Total functions needing array overload:** ~14 (2 operations × 7 numeric types)

## Implementation Checklist

- [ ] Add array overload to `add*` functions (7 numeric types)
- [ ] Add array overload to `multiply*` functions (7 numeric types)
- [ ] Update `composeOperators` to handle all operation types
- [ ] Create JSX component definitions for all typed operations
- [ ] Update IR serialization to include type information
- [ ] Add tests for all execution contexts
- [ ] Document error handling patterns
- [ ] Create migration guide for existing Architect code
