# The Lifted Library: Monadic Wrappers for Do-Notation

## ⚠️ CRITICAL BOUNDARY WARNING

**THIS AI WORKS ONLY IN THE `lifted` FOLDER. DO NOT TOUCH ANYTHING OUTSIDE THIS FOLDER.**
Other AIs are working on other parts of the toolsmith. Any modifications outside this folder will cause conflicts and invoke The Architect's wrath.

## Purpose

The `lifted` folder contains monadic versions of the `vanilla` functions, designed to work seamlessly with do-notation. These functions "lift" pure operations into the Validation monad context, enabling:

1. **Error accumulation** rather than short-circuiting on first error
2. **Composability** through do-notation with `yield`
3. **Type safety** with proper monadic types
4. **List comprehension** style operations like Haskell

## The Validation Monad

Unlike Result (which fails fast on first error) or Maybe (which has no error info), Validation accumulates errors while processing, allowing us to collect ALL validation errors or processing failures in a single pass.

```typescript
type Validation<E, A> = Valid<A> | Invalid<E>
type Valid<A> = { _tag: "Valid"; value: A }
type Invalid<E> = { _tag: "Invalid"; errors: NonEmptyArray<E> }
```

## Implementation Rules

### 1. Strict Functional Programming

- **NO classes** - Only functions
- **NO mutations** - All data immutable
- **NO methods** - No OOP patterns
- **One function per file** - Function name is folder name
- **Pure functions only** - Except explicit I/O operations

### 2. Use Toolsmith Functions

- **NEVER use JavaScript array methods directly**
- Always use `vanilla` functions from the toolsmith
- Example: Use `map` from `vanilla/array/map`, not `Array.prototype.map`

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
```

### 4. Function Signature Pattern

Each lifted function follows this pattern:

```typescript
// Original vanilla function
function map<T, U>(fn: (T) => U) {
	return function mapWithFn(array: Array<T>): Array<U> {
		// implementation
	}
}

// Lifted version - Works with EITHER Result OR Validation!
import mapVanilla from "@sitebender/toolsmith/vanilla/array/map/index.ts"

// Function overloads for type safety
function map<T, U, E>(fn: (T) => Result<E, U>): (array: Array<T>) => Result<Array<E>, Array<U>>
function map<T, U, E>(fn: (T) => Validation<E, U>): (array: Array<T>) => Validation<Array<E>, Array<U>>

// Implementation - detects monad type and uses appropriate sequencing
function map<T, U, E>(fn: (T) => Result<E, U> | Validation<E, U>) {
	return function mapWithFn(array: Array<T>) {
		// 1. Use vanilla map to apply fn to each element
		const results = mapVanilla(fn)(array) // Array<Result<E, U> | Validation<E, U>>
		
		// 2. Detect monad type and sequence appropriately
		if (results.length === 0) {
			// Return appropriate empty based on function signature
			return /* empty result matching input type */
		}
		
		const firstResult = results[0]
		if ('tag' in firstResult) {
			// Result monad - fail fast on first error
			return sequenceResult(results)
		} else {
			// Validation monad - accumulate all errors  
			return sequenceValidation(results)
		}
	}
}

export default map
```

## Usage Examples

### Vanilla Function Usage
```typescript
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

// Simple transformation - always succeeds
const numbers = [1, 2, 3, 4, 5]
const doubled = map((x: number) => x * 2)(numbers)
// Result: [2, 4, 6, 8, 10]

const names = ["alice", "bob", "charlie"]
const uppercased = map((name: string) => name.toUpperCase())(names)
// Result: ["ALICE", "BOB", "CHARLIE"]
```

### Lifted Function Usage
```typescript
import mapValidation from "@sitebender/toolsmith/lifted/array/map/index.ts"
import valid from "@sitebender/toolsmith/monads/validation/valid/index.ts"
import invalid from "@sitebender/toolsmith/monads/validation/invalid/index.ts"

// Transformation that can fail - accumulates ALL errors
const validateAndDouble = (x: number) =>
	x > 0 ? valid(x * 2) : invalid([`${x} must be positive`])

const mixedNumbers = [1, -2, 3, -4, 5]
const result = mapValidation(validateAndDouble)(mixedNumbers)
// Result: Invalid(["-2 must be positive", "-4 must be positive"])

const validNumbers = [1, 2, 3, 4, 5]
const successResult = mapResult(validateAndDouble)(validNumbers)
// Result: Ok([2, 4, 6, 8, 10])
```

### Do-Notation Usage
```typescript
import doNotation from "@sitebender/toolsmith/monads/doNotation/index.ts"
import mapResult from "@sitebender/toolsmith/lifted/array/map/index.ts"
import filterResult from "@sitebender/toolsmith/lifted/array/filter/index.ts"
import Ok from "@sitebender/toolsmith/monads/result/Ok/index.ts"
import Err from "@sitebender/toolsmith/monads/result/Err/index.ts"

const processData = doNotation(function* () {
	const rawData = yield valid([1, -2, 3, -4, 5])
	const validated = yield mapValidation(validateAndDouble)(rawData)
	const filtered = yield filterValidation((x: number) => 
		x > 5 ? valid(true) : invalid([`${x} below threshold`])
	)(validated)
	return filtered
})
// Accumulates ALL validation errors from both steps
```

## Implementation Order

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
const result = doNotation(function* () {
	const nums = yield valid([1, 2, 3, 4, 5])
	const doubled = yield mapValidation((x) => valid(x * 2))(nums)
	const filtered = yield filterValidation((x) =>
		x > 5 ? valid(true) : invalid(["too small"])
	)(doubled)
	return filtered
})
// Result: Valid([6, 8, 10]) or Invalid(["too small", "too small"])
```

### 2. Errors Accumulate Properly

```typescript
const validateAll = doNotation(function* () {
	const items = yield valid([item1, item2, item3])
	const validated = yield mapValidation(validate)(items)
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
// index.test.ts example for mapValidation
import { assertEquals } from "@std/assert"
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
import mapValidation from "./index.ts"
import valid from "../../monads/validation/valid/index.ts"
import invalid from "../../monads/validation/invalid/index.ts"

describe("mapValidation", () => {
	it("maps over Valid values", () => {
		const result = mapValidation((x: number) => valid(x * 2))([1, 2, 3])
		assertEquals(result, valid([2, 4, 6]))
	})

	it("accumulates errors", () => {
		const validate = (x: number) => x > 2 ? valid(x) : invalid([`${x} too small`])
		const result = mapValidation(validate)([1, 2, 3, 4])
		assertEquals(result, invalid(["1 too small", "2 too small"]))
	})

	it("handles empty arrays", () => {
		const result = mapValidation((x: number) => valid(x * 2))([])
		assertEquals(result, valid([]))
	})
})
```

## Common Pitfalls to Avoid

1. **Using native JS methods** - Always use toolsmith functions
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
