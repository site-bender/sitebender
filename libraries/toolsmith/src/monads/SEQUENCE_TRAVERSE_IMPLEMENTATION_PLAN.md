# Sequence and Traverse Implementation Plan

**Date**: 2025-11-08
**Scope**: Implement `sequence`, `traverse`, and `traverseWithIndex` for core monads
**Monads**: Result, Validation, Maybe
**Status**: Planning Complete, Ready for Implementation

---

## Overview

Implementing standard functional programming functions for converting collections of monadic values into monadic collections.

**Functions**:
- `sequence`: `Array<M<A>>` → `M<Array<A>>` (invert structure)
- `traverse`: `(A → M<B>)` → `Array<A>` → `M<Array<B>>` (map then sequence)
- `traverseWithIndex`: `(A, index → M<B>)` → `Array<A>` → `M<Array<B>>` (indexed traverse)

**Total**: 9 functions (3 functions × 3 monads)

---

## Monad-Specific Behaviors

### Result Monad (Fail-Fast)

**Type Structure**:
```typescript
type Result<E, A> =
  | { _tag: "ok"; value: A }
  | { _tag: "error"; error: E }  // SINGLE error
```

**Behavior**: Stops at first error encountered

**Example**:
```typescript
sequence()([ok(1), error("bad"), ok(3)])
// → error("bad")  // Stops here, never processes ok(3)
```

### Validation Monad (Error Accumulation)

**Type Structure**:
```typescript
type Validation<E, A> =
  | { _tag: "Success"; value: A }
  | { _tag: "Failure"; errors: ReadonlyArray<E> }  // ARRAY of errors
```

**Behavior**: Processes entire array, accumulates ALL errors

**Example**:
```typescript
sequence()([success(1), failure([e1]), success(3), failure([e2])])
// → failure([e1, e2])  // Collected BOTH errors
```

### Maybe Monad (Short-Circuit on Nothing)

**Type Structure**:
```typescript
type Maybe<A> =
  | { _tag: "Just"; value: A }
  | { _tag: "Nothing" }
```

**Behavior**: Stops at first `nothing()` encountered

**Example**:
```typescript
sequence()([just(1), nothing(), just(3)])
// → nothing()  // Stops at first nothing
```

---

## Either Monad: ON HOLD

**Reason**: Either monad in this codebase treats Left and Right as **equal branches** (branching, not error handling). Traditional `sequence` semantics bias Right over Left, which contradicts this philosophy.

**Decision**: Skip Either implementations until we determine appropriate semantics that respect equal branches.

---

## BATCH 1: Result Monad

### Files to Create

```
/monads/result/sequence/index.ts
/monads/result/sequence/index.test.ts
/monads/result/traverse/index.ts
/monads/result/traverse/index.test.ts
/monads/result/traverseWithIndex/index.ts
/monads/result/traverseWithIndex/index.test.ts
```

### Type Signatures

```typescript
// sequence
export default function sequence<E, A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Result<E, A>>
  ): Result<E, ReadonlyArray<A>>
}

// traverse
export default function traverse<E, A, B>(fn: (value: A) => Result<E, B>) {
  return function traverseWithFunction(
    array: ReadonlyArray<A>
  ): Result<E, ReadonlyArray<B>>
}

// traverseWithIndex
export default function traverseWithIndex<E, A, B>(
  fn: (value: A, index: number) => Result<E, B>
) {
  return function traverseWithIndexAndFunction(
    array: ReadonlyArray<A>
  ): Result<E, ReadonlyArray<B>>
}
```

### Behavior Specification

**sequence**:
- Input: `ReadonlyArray<Result<E, A>>`
- Output: `Result<E, ReadonlyArray<A>>`
- If ALL elements are `ok(value)`, return `ok([v1, v2, v3, ...])`
- If ANY element is `error(e)`, return `error(e)` IMMEDIATELY (fail-fast)
- Empty array returns `ok([])`

**traverse**:
- Input: Function `(A → Result<E, B>)` and `ReadonlyArray<A>`
- Output: `Result<E, ReadonlyArray<B>>`
- Applies `fn` to each element left-to-right
- Stops at first error
- Equivalent to: `traverse(f)(xs) = sequence(map(f)(xs))`

**traverseWithIndex**:
- Input: Function `(A, index → Result<E, B>)` and `ReadonlyArray<A>`
- Output: `Result<E, ReadonlyArray<B>>`
- Same as traverse but passes index to function
- `fn(value, index)` gets both value and position

### Implementation Pattern

```typescript
// sequence implementation (using loop for stack safety)
export default function sequence<E, A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Result<E, A>>
  ): Result<E, ReadonlyArray<A>> {
    const result: Array<A> = []

    //++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion
    //++ [EXCEPTION] JS operators and methods permitted for performance
    for (let index = 0; index < array.length; index++) {
      const element = array[index]

      if (isError(element)) {
        return element  // Fail-fast: return first error
      }

      if (isOk(element)) {
        //++ [EXCEPTION] .push() on local array for performance
        result.push(element.value)
      }
    }

    return ok(result)
  }
}
```

### Required Imports

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import ok from "../ok/index.ts"
import error from "../error/index.ts"
import isOk from "../isOk/index.ts"
import isError from "../isError/index.ts"
```

### Tests Required

For each function:
- ✅ Happy path: all ok values → ok of array
- ✅ First error: stops processing immediately
- ✅ Error in middle: returns that error, doesn't process rest
- ✅ Empty array: returns ok([])
- ✅ Single element ok: returns ok([value])
- ✅ Single element error: returns error
- ✅ Large array (1000+ elements): verify stack safety
- ✅ Type safety: proper Result types maintained

### Constitutional Compliance Checklist

- [ ] Named functions only (no arrow functions except in types)
- [ ] Curried (one parameter per function)
- [ ] Pure (no mutations of inputs)
- [ ] Loops not recursion (for stack safety)
- [ ] No exceptions (return Result values)
- [ ] Immutable inputs (ReadonlyArray)
- [ ] One function per file
- [ ] Proper type annotations
- [ ] Envoy comments with `//++`
- [ ] Exception comments for loops/built-ins
- [ ] No classes, no OOP
- [ ] No barrel files

### Execution Order

1. Implement `sequence/index.ts`
2. Write `sequence/index.test.ts`
3. Run: `deno task test monads/result/sequence`
4. Fix until passing
5. Run: `deno task fmt && deno task lint`
6. Implement `traverse/index.ts`
7. Write `traverse/index.test.ts`
8. Run: `deno task test monads/result/traverse`
9. Fix until passing
10. Run: `deno task fmt && deno task lint`
11. Implement `traverseWithIndex/index.ts`
12. Write `traverseWithIndex/index.test.ts`
13. Run: `deno task test monads/result/traverseWithIndex`
14. Fix until passing
15. Run: `deno task fmt && deno task lint`
16. Run all Result tests: `deno task test monads/result`
17. Verify batch complete before proceeding to Batch 2

---

## BATCH 2: Validation Monad

### Files to Create

```
/monads/validation/sequence/index.ts
/monads/validation/sequence/index.test.ts
/monads/validation/traverse/index.ts
/monads/validation/traverse/index.test.ts
/monads/validation/traverseWithIndex/index.ts
/monads/validation/traverseWithIndex/index.test.ts
```

### Type Signatures

```typescript
// sequence
export default function sequence<E, A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Validation<E, A>>
  ): Validation<E, ReadonlyArray<A>>
}

// traverse
export default function traverse<E, A, B>(fn: (value: A) => Validation<E, B>) {
  return function traverseWithFunction(
    array: ReadonlyArray<A>
  ): Validation<E, ReadonlyArray<B>>
}

// traverseWithIndex
export default function traverseWithIndex<E, A, B>(
  fn: (value: A, index: number) => Validation<E, B>
) {
  return function traverseWithIndexAndFunction(
    array: ReadonlyArray<A>
  ): Validation<E, ReadonlyArray<B>>
}
```

### Behavior Specification

**CRITICAL DIFFERENCE FROM RESULT**:
- Validation does NOT fail-fast
- Validation ACCUMULATES all errors
- Must process ENTIRE array even after finding failures

**sequence**:
- Input: `ReadonlyArray<Validation<E, A>>`
- Output: `Validation<E, ReadonlyArray<A>>`
- If ALL elements are `success(value)`, return `success([v1, v2, v3, ...])`
- If ANY elements are `failure(errors)`, collect ALL error arrays: `failure([...e1, ...e2, ...e3])`
- Must process entire array to collect all errors
- Empty array returns `success([])`

**traverse**:
- Input: Function `(A → Validation<E, B>)` and `ReadonlyArray<A>`
- Output: `Validation<E, ReadonlyArray<B>>`
- Applies `fn` to each element
- Collects ALL errors from ALL elements
- Returns combined failure or success of all values

**traverseWithIndex**:
- Input: Function `(A, index → Validation<E, B>)` and `ReadonlyArray<A>`
- Output: `Validation<E, ReadonlyArray<B>>`
- Same as traverse but passes index to function

### Implementation Pattern

```typescript
// sequence implementation (error accumulation)
export default function sequence<E, A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Validation<E, A>>
  ): Validation<E, ReadonlyArray<A>> {
    const values: Array<A> = []
    const errors: Array<E> = []

    //++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth
    //++ [EXCEPTION] JS operators and methods permitted for performance
    for (let index = 0; index < array.length; index++) {
      const element = array[index]

      if (isFailure(element)) {
        //++ [EXCEPTION] .push() and spread for error accumulation
        errors.push(...element.errors)  // Accumulate ALL errors
      }

      if (isSuccess(element)) {
        values.push(element.value)
      }
    }

    // Return failure if ANY errors, otherwise success
    if (errors.length > 0) {
      return failure(errors)
    }

    return success(values)
  }
}
```

### Required Imports

```typescript
import type { Validation } from "../../types/fp/validation/index.ts"
import success from "../success/index.ts"
import failure from "../failure/index.ts"
import isSuccess from "../isSuccess/index.ts"
import isFailure from "../isFailure/index.ts"
```

### Tests Required

Same as Result, but ALSO test:
- ✅ Multiple failures: all errors are accumulated
- ✅ Error array concatenation is correct
- ✅ Processing continues after first failure
- ✅ Mixed success/failure: collects all errors, ignores successes
- ✅ Error order preserved
- ✅ Duplicate errors kept (no deduplication)

### Constitutional Compliance Checklist

Same as Batch 1

### Execution Order

Same pattern as Batch 1:
1. sequence → test → fix → lint
2. traverse → test → fix → lint
3. traverseWithIndex → test → fix → lint
4. Verify batch complete before Batch 3

---

## BATCH 3: Maybe Monad

### Files to Create

```
/monads/maybe/sequence/index.ts
/monads/maybe/sequence/index.test.ts
/monads/maybe/traverse/index.ts
/monads/maybe/traverse/index.test.ts
/monads/maybe/traverseWithIndex/index.ts
/monads/maybe/traverseWithIndex/index.test.ts
```

### Type Signatures

```typescript
// sequence
export default function sequence<A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Maybe<A>>
  ): Maybe<ReadonlyArray<A>>
}

// traverse
export default function traverse<A, B>(fn: (value: A) => Maybe<B>) {
  return function traverseWithFunction(
    array: ReadonlyArray<A>
  ): Maybe<ReadonlyArray<B>>
}

// traverseWithIndex
export default function traverseWithIndex<A, B>(
  fn: (value: A, index: number) => Maybe<B>
) {
  return function traverseWithIndexAndFunction(
    array: ReadonlyArray<A>
  ): Maybe<ReadonlyArray<B>>
}
```

### Behavior Specification

**sequence**:
- Input: `ReadonlyArray<Maybe<A>>`
- Output: `Maybe<ReadonlyArray<A>>`
- If ALL elements are `just(value)`, return `just([v1, v2, v3, ...])`
- If ANY element is `nothing()`, return `nothing()` immediately
- Empty array returns `just([])`

**traverse**:
- Input: Function `(A → Maybe<B>)` and `ReadonlyArray<A>`
- Output: `Maybe<ReadonlyArray<B>>`
- Applies `fn` to each element
- Short-circuits on first `nothing()`

**traverseWithIndex**:
- Input: Function `(A, index → Maybe<B>)` and `ReadonlyArray<A>`
- Output: `Maybe<ReadonlyArray<B>>`
- Same as traverse but passes index to function

### Implementation Pattern

```typescript
// sequence implementation (short-circuit on nothing)
export default function sequence<A>() {
  return function sequenceWithArray(
    array: ReadonlyArray<Maybe<A>>
  ): Maybe<ReadonlyArray<A>> {
    const result: Array<A> = []

    //++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth
    //++ [EXCEPTION] JS operators and methods permitted for performance
    for (let index = 0; index < array.length; index++) {
      const element = array[index]

      if (isNothing(element)) {
        return nothing()  // Short-circuit on first nothing
      }

      if (isJust(element)) {
        //++ [EXCEPTION] .push() on local array for performance
        result.push(element.value)
      }
    }

    return just(result)
  }
}
```

### Required Imports

```typescript
import type { Maybe } from "../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"
import isNothing from "../isNothing/index.ts"
```

### Tests Required

- ✅ Happy path: all just values → just of array
- ✅ First nothing: returns nothing immediately
- ✅ Nothing in middle: short-circuits
- ✅ Empty array: returns just([])
- ✅ Single element just: returns just([value])
- ✅ Single element nothing: returns nothing
- ✅ Large array: verify stack safety
- ✅ Type safety: proper Maybe types maintained

### Constitutional Compliance Checklist

Same as Batch 1

### Execution Order

Same pattern as Batch 1 and 2:
1. sequence → test → fix → lint
2. traverse → test → fix → lint
3. traverseWithIndex → test → fix → lint
4. Verify batch complete

---

## General Implementation Rules

### Stack Safety (CRITICAL)

**NEVER use recursion for array iteration**

JavaScript/TypeScript has NO guaranteed tail call optimization. Recursive array functions will blow the stack at ~10,000-15,000 elements.

**ALWAYS use loops:**

```typescript
//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
//++ [EXCEPTION] JS operators and methods permitted for performance
for (let index = 0; index < array.length; index++) {
  const element = array[index]
  // Process element
}
```

### Permitted Exceptions

With proper `[EXCEPTION]` comments:

```typescript
//++ [EXCEPTION] Loop with let binding for stack safety
for (let index = 0; index < array.length; index++) { ... }

//++ [EXCEPTION] Array .length property for performance
array.length

//++ [EXCEPTION] Array indexing for performance
array[index]

//++ [EXCEPTION] .push() on local array for performance
localArray.push(element)

//++ [EXCEPTION] Spread operator for array concatenation
errors.push(...element.errors)

//++ [EXCEPTION] Property access on monad internals
element.value
element.error
element.errors
```

### Constitutional Rules

**MUST follow:**
1. Named functions only (no arrow functions except in type signatures)
2. Curried (one parameter per function)
3. Pure (no mutations of inputs)
4. Loops not recursion (for stack safety)
5. No exceptions (return monad values)
6. Immutable inputs (ReadonlyArray)
7. One function per file
8. Proper type annotations
9. Envoy comments with `//++`
10. No classes, no OOP
11. No barrel files

### Test Pattern

```typescript
import { assertEquals } from "@std/assert"
import sequence from "./index.ts"
import ok from "../ok/index.ts"
import error from "../error/index.ts"

Deno.test("sequence - happy path - all ok values", function testSequenceHappy() {
  const input = [ok(1), ok(2), ok(3)]
  const result = sequence()(input)
  assertEquals(result, ok([1, 2, 3]))
})

Deno.test("sequence - fail fast - first error", function testSequenceFailFast() {
  const input = [ok(1), error("bad"), ok(3)]
  const result = sequence()(input)
  assertEquals(result, error("bad"))
})

Deno.test("sequence - empty array", function testSequenceEmpty() {
  const input = []
  const result = sequence()(input)
  assertEquals(result, ok([]))
})
```

---

## Workflow (ONE FILE AT A TIME)

For EACH function:

1. **Implement** the function
2. **Write** tests
3. **Run** tests: `deno task test path/to/function`
4. **Fix** until passing
5. **Run** lint: `deno task fmt && deno task lint`
6. **Fix** any linting issues
7. **Verify** constitutional compliance
8. **ONLY THEN** move to next function

**NO SHORTCUTS**:
- NO batching multiple files before testing
- NO parallelization
- NO "it will probably work"
- Test EACH function before moving to next

---

## Completion Criteria

### Per Function
- [ ] Implementation complete
- [ ] Tests written and passing
- [ ] Linting passing
- [ ] Constitutional compliance verified

### Per Batch
- [ ] All 3 functions implemented
- [ ] All tests passing
- [ ] All linting passing
- [ ] Batch verification complete

### Overall
- [ ] BATCH 1: Result complete
- [ ] BATCH 2: Validation complete
- [ ] BATCH 3: Maybe complete
- [ ] All 9 functions working
- [ ] Documentation updated
- [ ] Ready for production use

---

## Summary

**Scope**: 9 functions across 3 monads
**Approach**: Sequential, one function at a time
**Testing**: After each function, after each batch
**Timeline**: Complete when all tests pass and constitutional compliance verified

**Status**: Ready to begin implementation
**Next Step**: Start BATCH 1 - Result.sequence
