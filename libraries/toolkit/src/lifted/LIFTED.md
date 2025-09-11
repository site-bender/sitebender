# The Lifted Library: Monadic Wrappers for Do-Notation

## ⚠️ CRITICAL BOUNDARY WARNING

**THIS AI WORKS ONLY IN THE `lifted` FOLDER. DO NOT TOUCH ANYTHING OUTSIDE THIS FOLDER.**
Other AIs are working on other parts of the toolkit. Any modifications outside this folder will cause conflicts and invoke The Architect's wrath.

## Purpose

The `lifted` folder contains monadic versions of the `simple` functions, designed to work seamlessly with do-notation. These functions "lift" pure operations into the Result monad context, enabling:

1. **Error accumulation** rather than short-circuiting on first error
2. **Composability** through do-notation with `yield`
3. **Type safety** with proper monadic types
4. **List comprehension** style operations like Haskell

## The Result Monad

Unlike Either (which short-circuits on first Left) or Maybe (which has no error info), Result accumulates errors while processing, allowing us to collect ALL validation errors or processing failures in a single pass.

```typescript
type Result<T, E> =
	| { tag: "Ok"; value: T }
	| { tag: "Err"; errors: Array<E> }
```

## Implementation Rules

### 1. Strict Functional Programming

- **NO classes** - Only functions
- **NO mutations** - All data immutable
- **NO methods** - No OOP patterns
- **One function per file** - Function name is folder name
- **Pure functions only** - Except explicit I/O operations

### 2. Use Toolkit Functions

- **NEVER use JavaScript array methods directly**
- Always use `simple` functions from the toolkit
- Example: Use `map` from `simple/array/map`, not `Array.prototype.map`

### 3. File Structure

```
lifted/
├── array/
│   ├── map/
│   │   ├── index.ts       # The lifted map function
│   │   └── index.test.ts  # TDD tests
│   ├── filter/
│   │   ├── index.ts
│   │   └── index.test.ts
│   └── reduce/
│       ├── index.ts
│       └── index.test.ts
├── result/
│   ├── index.ts           # Result monad implementation
│   └── index.test.ts
└── doResult/
    ├── index.ts           # Do-notation for Result
    └── index.test.ts
```

### 4. Function Signature Pattern

Each lifted function follows this pattern:

```typescript
// Original simple function
const map = <T, U>(fn: (T) => U) => (array: Array<T>): Array<U>

// Lifted version
const mapResult = <T, U, E>(fn: (T) => Result<U, E>) => 
  (array: Array<T>): Result<Array<U>, Array<E>>
```

## Implementation Order

### Phase 1: Foundation (MUST BE FIRST)

1. **Result monad** - The core type with Ok/Err constructors
2. **doResult** - Do-notation support for Result
3. **Basic Result operations** - map, bind, of, isOk, isErr

### Phase 2: Core Array Operations

Order chosen based on frequency of use and dependencies:

1. **map** - Most fundamental transformation
2. **filter** - Second most common operation
3. **reduce** - Can implement others with this
4. **flatMap** - Monadic bind for arrays
5. **concat** - Combining arrays
6. **head/tail** - Basic list operations

### Phase 3: Extended Array Operations

7. **take/drop** - Slicing operations
8. **zip/zipWith** - Parallel combination
9. **partition** - Split by predicate
10. **groupBy** - Categorization
11. **sort** - Ordering (careful with purity!)
12. **unique** - Deduplication

### Phase 4: Specialized Operations

- Array predicates (all, some, none)
- Array searches (find, findIndex)
- Array transformations (reverse, intersperse)

## Success Criteria

We know we've implemented correctly when:

### 1. Do-Notation Works Flawlessly

```typescript
const result = doResult(function* () {
	const nums = yield Ok([1, 2, 3, 4, 5])
	const doubled = yield mapResult((x) => Ok(x * 2))(nums)
	const filtered = yield filterResult((x) =>
		x > 5 ? Ok(true) : Err("too small")
	)(doubled)
	return filtered
})
// Result: Ok([6, 8, 10]) or Err(["too small", "too small"])
```

### 2. Errors Accumulate Properly

```typescript
const validateAll = doResult(function* () {
	const items = yield Ok([item1, item2, item3])
	const validated = yield mapResult(validate)(items)
	return validated
})
// If ANY items fail validation, we get ALL the errors, not just the first
```

### 3. Types Flow Correctly

- TypeScript infers types through the entire pipeline
- No `any` types required
- Generic types preserved properly

### 4. Tests Pass

Each function has tests that verify:

- Basic happy path
- Error accumulation
- Empty array handling
- Type preservation
- Composition with other lifted functions

## Testing Strategy (TDD)

Write tests FIRST for each function:

```typescript
// index.test.ts example for mapResult
import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
import mapResult from "./index.ts"
import { Err, Ok } from "../../result/index.ts"

describe("mapResult", () => {
	it("maps over Ok values", () => {
		const result = mapResult((x: number) => Ok(x * 2))([1, 2, 3])
		assertEquals(result, Ok([2, 4, 6]))
	})

	it("accumulates errors", () => {
		const validate = (x: number) => x > 2 ? Ok(x) : Err(`${x} too small`)
		const result = mapResult(validate)([1, 2, 3, 4])
		assertEquals(result, Err(["1 too small", "2 too small"]))
	})

	it("handles empty arrays", () => {
		const result = mapResult((x: number) => Ok(x * 2))([])
		assertEquals(result, Ok([]))
	})
})
```

## Common Pitfalls to Avoid

1. **Using native JS methods** - Always use toolkit functions
2. **Mutating arrays** - Always create new arrays
3. **Short-circuiting on first error** - Must accumulate ALL errors
4. **Forgetting to handle empty arrays** - Edge cases matter
5. **Breaking type inference** - Preserve generic types properly
6. **Creating circular dependencies** - Careful with imports
7. **Writing impure functions** - No side effects except in designated I/O

## The Golden Rule

**If it works with `yield` in do-notation and accumulates errors properly, you've succeeded.**

Remember: We're building the Haskell of TypeScript here. Think mathematically. Think purely. Think monadically.

---

_"Do it right the first time. There is no undo in production."_ — The Architect
