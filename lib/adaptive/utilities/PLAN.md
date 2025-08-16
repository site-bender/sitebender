# Utilities Library Plan and Architecture

## Overview

This document defines the complete architecture, standards, and implementation plan for the @sitebender utilities library. The library provides functional programming utilities with a dual safe/unsafe paradigm, inspired by Ramda but with modern TypeScript and Either monad support.

## Core Architecture: Safe/Unsafe Dual Paradigm

### Directory Structure
```
lib/adaptive/utilities/
├── types/
│   └── either/           # Either monad implementation
│       ├── index.ts      # Core Either type and utilities
│       └── pipeline/     # Pipeline and composition utilities
├── unsafe/               # Traditional functions that may throw or return undefined
│   ├── array/           # Array utilities
│   ├── object/          # Object utilities
│   └── string/          # String utilities
├── safe/                # Monadic functions that return Either<Error, Result>
│   ├── array/           # Safe array utilities
│   ├── object/          # Safe object utilities
│   └── string/          # Safe string utilities
└── tests/               # Behavioral tests for all functions
```

### Key Principles

1. **EVERY function exists in TWO versions**:
   - `unsafe/` - Traditional version that may throw or return undefined
   - `safe/` - Returns `Either<SpecificError, Result>` for complete safety

2. **Unsafe functions**:
   - Return results directly
   - Return `undefined` for missing values
   - May throw exceptions on errors
   - Handle `null`/`undefined` inputs gracefully (usually return empty result)
   - Used for simple cases and performance-critical paths

3. **Safe functions**:
   - ALWAYS return `Either<Error, Result>`
   - NEVER throw exceptions
   - Capture ALL errors with specific error types
   - Compose perfectly with pipeline functions
   - Delegate to unsafe version for actual logic

## Implementation Standards

### 1. TypeScript Requirements

**ABSOLUTELY NO CHEATING**:
- ❌ NO `any` types - use `unknown` for untyped inputs
- ❌ NO `Function` type - use specific signatures like `(value: T) => R`
- ❌ NO `as any` casts - properly type everything
- ✅ USE `Value` type from `types/index.ts` for recursive structures
- ✅ USE specific function signatures for all callbacks
- ✅ USE generic types for maximum flexibility

### 2. Function Design Patterns

#### Currying (Data-Last)
ALL functions must be curried with data as the last parameter:

```typescript
// CORRECT - Configuration first, data last
const take = (n: number) => (array: ReadonlyArray<T>): Array<T> => {
  // implementation
}

// WRONG - Data first
const take = (array: ReadonlyArray<T>, n: number): Array<T> => {
  // implementation
}
```

#### Immutability
- NEVER modify input data
- ALWAYS return new objects/arrays
- Use spread operators and array methods that return new arrays
- Exception: IO operations (file system, network, etc.)

#### Null/Undefined Handling
Unsafe functions should handle gracefully:
```typescript
const groupBy = (keyFn) => (array) => {
  if (array == null || !Array.isArray(array)) {
    return {}  // Return empty result, don't throw
  }
  // ... implementation
}
```

### 3. JSDoc Requirements

EVERY function MUST have comprehensive JSDoc with:

```typescript
/**
 * Brief one-line description of what the function does
 * 
 * Longer explanation of the function's purpose, behavior, and any
 * important details about how it works or when to use it.
 * 
 * @curried (param1) => (param2) => result
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter  
 * @returns Description of return value
 * @example
 * ```typescript
 * // Basic usage example
 * functionName(config)(data)
 * // Expected output with comment
 * 
 * // Edge case example
 * functionName(edgeConfig)(edgeData)
 * // Expected output
 * 
 * // Partial application example
 * const configured = functionName(config)
 * configured(data1)  // result1
 * configured(data2)  // result2
 * ```
 * @property Property1 - Important characteristic (e.g., Immutable)
 * @property Property2 - Another characteristic (e.g., Type-safe)
 */
```

### 4. Safe Function Implementation

Every safe function follows this pattern:

```typescript
import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import functionUnsafe from "../../../unsafe/category/function/index.ts"

// Specific error type with all context
export interface FunctionError extends Error {
  name: "FunctionError"  // Literal type
  param1: unknown        // Include all parameters
  param2: unknown        // for debugging
}

const functionSafe = (param1: Type1) => (param2: Type2): Either<FunctionError, Result> => {
  try {
    // Validate inputs if needed
    if (typeof param1 !== "expectedType") {
      const error: FunctionError = {
        name: "FunctionError",
        message: `Param1 must be ${expectedType}, got ${typeof param1}`,
        param1,
        param2
      } as FunctionError
      return left(error)
    }
    
    // Delegate to unsafe version
    const result = functionUnsafe(param1)(param2)
    return right(result)
  } catch (err) {
    const error: FunctionError = {
      name: "FunctionError",
      message: err instanceof Error ? err.message : String(err),
      param1,
      param2
    } as FunctionError
    return left(error)
  }
}
```

### 5. Either Monad and Pipeline

The Either type enables railway-oriented programming:

```typescript
// Types
type Either<L, R> = Left<L> | Right<R>
type Left<L> = { _tag: "Left", value: L, ... }
type Right<R> = { _tag: "Right", value: R, ... }

// Pipeline usage
import { pipeEither } from "../types/either/pipeline/index.ts"

const process = pipeEither(
  pathSafe("user.profile"),
  mapValuesSafe(normalize),
  setSafe("updated")(Date.now()),
  validateProfileSafe
)

const result = process(userData)  // Either<Error, ValidatedProfile>
```

### 6. Testing Requirements

#### Test File Organization
```
tests/
├── safe-unsafe-comparison.test.ts     # Compare behavior
├── object-operations/
│   ├── mergeDeep.test.ts
│   ├── set.test.ts
│   └── ...
├── array-operations/
│   ├── groupBy.test.ts
│   └── ...
└── string-operations/
    └── words.test.ts
```

#### Test Structure
Each function needs:

1. **Basic functionality tests**
2. **Edge cases** (null, undefined, empty)
3. **Type-specific tests** 
4. **Immutability verification**
5. **Property-based tests** using fast-check

Example test structure:
```typescript
describe("functionName", () => {
  describe("basic functionality", () => {
    it("does primary operation", () => {})
    it("handles common case 2", () => {})
  })
  
  describe("edge cases", () => {
    it("handles null input", () => {})
    it("handles undefined input", () => {})
    it("handles empty input", () => {})
  })
  
  describe("immutability", () => {
    it("doesn't modify input", () => {})
  })
  
  describe("property-based tests", () => {
    it("maintains invariant X", () => {
      fc.assert(fc.property(...))
    })
  })
})
```

## Function Categories and Status

### Object Functions

#### Implemented (Safe & Unsafe)
- ✅ `path` - Get value at dot-notation path
- ✅ `pick` - Pick specified keys from object
- ✅ `omit` - Omit specified keys from object
- ✅ `mergeDeep` - Deep recursive merge
- ✅ `set` - Immutably set nested value
- ✅ `mapValues` - Transform all values
- ✅ `evolve` - Apply transformations to specific paths

#### Existing (Need Safe Versions)
- ⚠️ `has` - Check if path exists
- ⚠️ `keys` - Get object keys
- ⚠️ `values` - Get object values
- ⚠️ `entries` - Get [key, value] pairs
- ⚠️ `fromEntries` - Create object from entries
- ⚠️ `merge` - Shallow merge

#### Proposed High Priority
- `assocPath` - Associate value at path (alias for set)
- `dissocPath` - Remove value at path
- `lens` - Create lens for path
- `view` - View through lens
- `over` - Transform through lens
- `props` - Get multiple properties
- `propOr` - Get property with default
- `pathOr` - Get path with default
- `where` - Match object shape
- `whereEq` - Exact match object shape

### Array Functions

#### Implemented (Safe & Unsafe)
- ✅ `groupBy` - Group by key function
- ✅ `partition` - Split into two arrays
- ✅ `takeWhile` - Take while predicate true
- ✅ `dropWhile` - Drop while predicate true

#### Existing (Need Safe Versions)
- ⚠️ All basic array operations (map, filter, reduce, etc.)
- ⚠️ `chunk` - Split into chunks
- ⚠️ `compact` - Remove falsy values
- ⚠️ `concat` - Concatenate arrays
- ⚠️ `difference` - Set difference
- ⚠️ `intersection` - Set intersection
- ⚠️ `union` - Set union
- ⚠️ `unique` - Remove duplicates
- ⚠️ `flatten` - Flatten nested arrays
- ⚠️ `zip` - Zip arrays together

#### Proposed High Priority
- `scan` - Like reduce but returns all intermediate values
- `unfold` - Generate array from seed
- `aperture` - Sliding window
- `intersperse` - Insert separator between elements
- `splitEvery` - Split into chunks of size n
- `transpose` - Matrix transpose
- `sequence` - Sequence of Either/Maybe values

### String Functions

#### Implemented (Safe & Unsafe)
- ✅ `words` - Split into words intelligently
- ✅ `template` - String interpolation with placeholders

#### Existing (Need Safe Versions)
- ⚠️ `split` - Split by separator
- ⚠️ `trim` - Remove whitespace
- ⚠️ `toCamel` - Convert to camelCase
- ⚠️ `toPascal` - Convert to PascalCase
- ⚠️ `toKebab` - Convert to kebab-case
- ⚠️ `toSnake` - Convert to snake_case
- ⚠️ All other case conversions
- ⚠️ All padding functions

#### Proposed High Priority
- `toCamelImproved` - Better camelCase using words
- `capitalize` - Capitalize first letter
- `titleCase` - Title Case String
- `truncate` - Truncate with ellipsis
- `wrap` - Word wrap at column

### Predicates (Return Boolean)

These may not need safe versions since they return boolean:
- `isEmpty` - Check if empty
- `isNil` - Check if null/undefined  
- `isBlank` - Check if blank string
- All type checking predicates

### Functional Utilities

#### Proposed High Priority
- `curry` - Curry a function
- `uncurry` - Uncurry a function
- `flip` - Flip first two arguments
- `partial` - Partial application
- `memoize` - Memoization
- `debounce` - Debounce function calls
- `throttle` - Throttle function calls
- `once` - Call only once

## Migration Strategy

### Phase 1: Foundation (COMPLETED)
- ✅ Implement Either monad
- ✅ Create safe/unsafe folder structure
- ✅ Implement pipeline utilities
- ✅ Create proof of concept functions

### Phase 2: Core Functions (IN PROGRESS)
- ✅ Implement high-priority object functions
- ✅ Implement high-priority array functions
- ✅ Implement high-priority string functions
- 🔄 Add comprehensive tests

### Phase 3: Safe Wrappers
- Create safe versions for ALL existing unsafe functions
- Ensure consistent error types
- Add pipeline examples in JSDoc

### Phase 4: Advanced Functions
- Implement lenses
- Implement transducers
- Add specialized utilities

### Phase 5: Documentation
- Create usage guide
- Add cookbook of common patterns
- Document migration from unsafe to safe

## Common Pitfalls to Avoid

1. **DON'T use `any` or `Function` types** - Be specific
2. **DON'T mutate input data** - Always return new
3. **DON'T throw in safe functions** - Return Left
4. **DON'T forget null checks** - Handle gracefully  
5. **DON'T skip tests** - Every function needs tests
6. **DON'T skip JSDoc** - Documentation is mandatory
7. **DON'T mix paradigms** - Keep safe/unsafe separate
8. **DON'T use wrong import paths** - Check relative paths
9. **DON'T forget currying** - Data always last
10. **DON'T create functions in wrong location** - Follow structure

## Type Definitions to Use

From `lib/adaptive/types/index.ts`:
```typescript
// Use these instead of any
type Value = PrimitiveValue | Array<Value> | { [key: string]: Value } | ...
type PrimitiveValue = string | number | boolean | null | undefined

// For functions, be specific:
type Predicate<T> = (value: T) => boolean
type Mapper<T, R> = (value: T) => R
type Reducer<T, R> = (acc: R, value: T) => R
type KeyFunction<T> = (value: T) => string | number
```

## Example Implementation Checklist

When implementing a new function:

- [ ] Create unsafe version in `/unsafe/category/functionName/index.ts`
- [ ] Add comprehensive JSDoc with examples
- [ ] Use proper TypeScript types (no `any` or `Function`)
- [ ] Make it curried with data-last
- [ ] Handle null/undefined gracefully
- [ ] Ensure immutability
- [ ] Create safe version in `/safe/category/functionName/index.ts`
- [ ] Define specific error interface
- [ ] Wrap unsafe version with try/catch
- [ ] Return Either<Error, Result>
- [ ] Create tests in `/tests/category-operations/functionName.test.ts`
- [ ] Test basic functionality
- [ ] Test edge cases
- [ ] Test immutability
- [ ] Add property-based tests
- [ ] Test both safe and unsafe versions
- [ ] Update this PLAN.md with status

## Questions to Ask Before Implementation

1. Does this function already exist in unsafe? Create safe version first.
2. What should happen with null/undefined input? Return empty or error?
3. What's the most specific type signature? Avoid `unknown` if possible.
4. Can this be composed with other functions? Design for composition.
5. What error information would help debugging? Include in error type.
6. Is the JSDoc clear enough for a new user? Add more examples.
7. Are the tests comprehensive? Add edge cases.
8. Is it truly immutable? Check for mutations.

## Summary

This utilities library provides a complete functional programming toolkit with a unique dual paradigm approach. Every function exists in both unsafe (traditional) and safe (monadic) versions, allowing developers to choose the right tool for their needs. The safe versions enable railway-oriented programming through the Either monad, while unsafe versions provide familiar, performant alternatives.

All code must be properly typed (no `any`), fully documented (comprehensive JSDoc), thoroughly tested (behavioral + property-based), and consistently structured (curried, immutable, data-last).

The goal is a zero-dependency, tree-shakable, type-safe utility library that rivals Ramda in functionality while exceeding it in type safety and error handling.