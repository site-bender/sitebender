# Toolsmith Functions Migration for Architect PoC

> **Status**: Migration Specification  
> **Created**: 2025-01-07  
> **Purpose**: Detailed specification for migrating 13 Toolsmith functions needed for Architect PoC

## Overview

This document specifies the migration of 13 functions from `vanilla/` to their new monadic form in the proper domain folders. All functions will be:
- **Curried** - One parameter per function
- **Monadic** - Return `Result<ValidationError, T>` or `Validation<ValidationError, T>`
- **Pure** - No side effects (except IO boundaries)
- **Immutable** - No mutations
- **Plain English** - Readable function names

## Migration List

### Array Domain (5 functions)

#### 1. filter
- **Source**: `src/vanilla/array/filter/index.ts`
- **Target**: `src/array/filter/index.ts`
- **Current Signature**: `(predicate: (item: T) => boolean) => (array: Array<T>) => Array<T>`
- **Target Signature**: `(predicate: (item: T) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`
- **Changes**: Add error handling for invalid inputs, return Result monad

#### 2. map
- **Source**: `src/vanilla/array/map/index.ts`
- **Target**: `src/array/map/index.ts`
- **Current Signature**: `(fn: (item: T) => U) => (array: Array<T>) => Array<U>`
- **Target Signature**: `(fn: (item: T) => U) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<U>>`
- **Changes**: Add error handling, return Result monad

#### 3. reduce
- **Source**: `src/vanilla/array/reduce/index.ts`
- **Target**: `src/array/reduce/index.ts`
- **Current Signature**: `(fn: (acc: U, item: T) => U) => (init: U) => (array: Array<T>) => U`
- **Target Signature**: `(fn: (acc: U) => (item: T) => U) => (init: U) => (array: ReadonlyArray<T>) => Result<ValidationError, U>`
- **Changes**: Curry the reducer function, add error handling, return Result monad

#### 4. find
- **Source**: `src/vanilla/array/find/index.ts`
- **Target**: `src/array/find/index.ts`
- **Current Signature**: `(predicate: (item: T) => boolean) => (array: Array<T>) => T | null`
- **Target Signature**: `(predicate: (item: T) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, T>`
- **Changes**: Return Result instead of null, add helpful error when not found

#### 5. join
- **Source**: `src/vanilla/array/join/index.ts`
- **Target**: `src/array/join/index.ts`
- **Current Signature**: `(separator: string) => (array: Array<T>) => string`
- **Target Signature**: `(separator: string) => (array: ReadonlyArray<T>) => Result<ValidationError, string>`
- **Changes**: Add error handling, return Result monad

### Validation Domain (5 functions)

#### 6. isDefined
- **Source**: `src/vanilla/validation/isDefined/index.ts`
- **Target**: `src/validation/isDefined/index.ts`
- **Current Signature**: `(value: T | null | undefined) => value is T`
- **Target Signature**: Same (type guards don't need Result wrapping)
- **Changes**: None - type guards are already pure predicates

#### 7. isNull
- **Source**: `src/vanilla/validation/isNull/index.ts`
- **Target**: `src/validation/isNull/index.ts`
- **Current Signature**: `(value: unknown) => value is null`
- **Target Signature**: Same
- **Changes**: None - type guard

#### 8. isNumber
- **Source**: `src/vanilla/validation/isNumber/index.ts`
- **Target**: `src/validation/isNumber/index.ts`
- **Current Signature**: `(value: unknown) => value is number`
- **Target Signature**: Same
- **Changes**: None - type guard

#### 9. isEqual
- **Source**: `src/vanilla/validation/isEqual/index.ts`
- **Target**: `src/validation/isEqual/index.ts`
- **Current Signature**: `(a: T) => (b: U) => boolean`
- **Target Signature**: Same
- **Changes**: None - already curried and pure

#### 10. isNotEmpty
- **Source**: `src/vanilla/validation/isNotEmpty/index.ts`
- **Target**: `src/validation/isNotEmpty/index.ts`
- **Current Signature**: `(value: unknown) => boolean`
- **Target Signature**: Same
- **Changes**: None - already pure predicate

### Conversion Domain (1 function)

#### 11. parseJson
- **Source**: DOES NOT EXIST
- **Target**: `src/conversion/parseJson/index.ts`
- **Signature**: `(jsonString: string) => Result<ValidationError, unknown>`
- **Purpose**: Wraps `JSON.parse()` exception at IO boundary
- **Implementation**: New function

### Math/Arithmetic Domain (2 functions - MOVE)

#### 12. addInteger
- **Source**: `src/newtypes/numericTypes/integer/addInteger/index.ts`
- **Target**: `src/math/arithmetic/add/addInteger.ts`
- **Current Signature**: `(augend: Integer) => (addend: Integer) => Result<ValidationError, Integer>`
- **Changes**: MOVE file, keep signature identical

#### 13. multiplyInteger
- **Source**: `src/newtypes/numericTypes/integer/multiplyInteger/index.ts`
- **Target**: `src/math/arithmetic/multiply/multiplyInteger.ts`
- **Current Signature**: `(multiplicand: Integer) => (multiplier: Integer) => Result<ValidationError, Integer>`
- **Changes**: MOVE file, keep signature identical

## Implementation Order

### Phase 1: Create New Domain Folders
1. Create `src/array/` directory
2. Create `src/validation/` directory
3. Create `src/conversion/` directory
4. Create `src/math/arithmetic/add/` directory
5. Create `src/math/arithmetic/multiply/` directory

### Phase 2: Migrate Validation Functions (Simple - Just Copy)
These are already pure, just need to be copied:
1. Copy `isDefined` to new location
2. Copy `isNull` to new location
3. Copy `isNumber` to new location
4. Copy `isEqual` to new location
5. Copy `isNotEmpty` to new location

### Phase 3: Migrate Array Functions (Add Result Monad)
These need Result wrapping:
1. Migrate `filter` with Result monad
2. Migrate `map` with Result monad
3. Migrate `reduce` with Result monad (curry reducer fn)
4. Migrate `find` with Result monad (no null)
5. Migrate `join` with Result monad

### Phase 4: Create New Functions
1. Create `parseJson` in conversion domain

### Phase 5: Move Arithmetic Functions
1. Move `addInteger` from newtypes to math/arithmetic
2. Move `multiplyInteger` from newtypes to math/arithmetic
3. Update imports in newtypes to re-export from math (for backwards compatibility during transition)

## Detailed Function Specifications

### parseJson

**File**: `src/conversion/parseJson/index.ts`

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Parses JSON string to unknown value
//++ Returns Result with error if JSON is malformed
//++ [IO] Wraps JSON.parse() exception at IO boundary
export default function parseJson(
  jsonString: string
): Result<ValidationError, unknown> {
  // Happy path: try to parse
  try {
    const parsed = JSON.parse(jsonString)
    return ok(parsed)
  } catch (err) {
    // Sad path: JSON is malformed
    const errorMessage = err instanceof Error ? err.message : String(err)
    
    return error({
      code: "JSON_PARSE_ERROR",
      field: "jsonString",
      messages: [`System cannot parse the JSON string: ${errorMessage}`],
      received: jsonString,
      expected: "Valid JSON string",
      suggestion: "Ensure the string is properly formatted JSON",
      severity: "requirement"
    })
  }
}
```

### filter (Monadic Version)

**File**: `src/array/filter/index.ts`

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"

//++ Filters array elements that satisfy predicate
//++ Returns Result with filtered array or error if input is invalid
export default function filter<T>(
  predicate: (item: T) => boolean
) {
  return function filterWithPredicate(
    array: ReadonlyArray<T>
  ): Result<ValidationError, ReadonlyArray<T>> {
    // Happy path: valid array
    if (isArray(array)) {
      const filtered = array.filter(predicate)
      return ok(filtered)
    }
    
    // Sad path: not an array
    return error({
      code: "FILTER_INVALID_INPUT",
      field: "array",
      messages: ["System needs an array to filter"],
      received: array,
      expected: "Array",
      suggestion: "Provide an array value",
      severity: "requirement"
    })
  }
}
```

Ready to proceed with implementation?
</result>
</attempt_completion>
