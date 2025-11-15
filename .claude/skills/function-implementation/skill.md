---
name: function-implementation
description: Patterns for implementing functions following Sitebender's constitutional rules. Covers currying, naming inner functions, parameter order, type annotations, and composition. Use when creating any new function. Includes script for generating boilerplate.
---

# Function Implementation

## Core Principle

**Every function must be curried, pure, and immutable.**

Functions are the fundamental building blocks of this codebase. Each function follows strict patterns: curried (takes exactly one parameter), named (never arrow syntax), pure (no side effects except at IO boundaries), and immutable (no mutations).

### What "Curried" Means

**CRITICAL DEFINITION: A curried function is a function that takes exactly ONE parameter.**

This is the definition from Haskell and lambda calculus. In Haskell, ALL functions are curried because they all take exactly one parameter.

**Understanding currying:**

- **Unary function**: Takes one parameter, returns a value → **IS CURRIED** (one parameter)
- **Binary function**: Takes one parameter, returns a function that takes one parameter → **IS CURRIED** (one parameter)
- **Ternary function**: Takes one parameter, returns function that returns function → **IS CURRIED** (one parameter)

**Curried does NOT mean "higher-order":**

- Curried = takes one parameter (any function with one parameter is curried)
- Higher-order = takes/returns functions (a subset of functions)
- A function can be curried but NOT higher-order (example: `function double(n: number): number`)
- A function can be both curried AND higher-order (example: `function map(fn) { return function(array) { ... } }`)

**All functions in this codebase are curried because they all take exactly one parameter.**

## When to Use This Skill

Use this skill when:

- Creating any new function
- Refactoring existing functions to follow constitutional rules
- Unsure how to structure curried functions
- Naming inner functions in curried chains
- Determining parameter order
- Adding type annotations
- Creating composable functions

**This skill is proactive** - Use it automatically when writing any function.

## Script Integration

### Config File Approach (Recommended)

Create a TypeScript config file with complete function specification:

```typescript
// add.config.ts
import type { FunctionConfig } from "./.claude/skills/function-implementation/types.ts"

export default {
	name: "add",
	conjunction: "To",
	parameters: [
		{ name: "augend", type: "number" },
		{ name: "addend", type: "number" },
	],
	returns: "number",
	description: "Adds two numbers together",
} satisfies FunctionConfig
```

**Generate the function:**

```bash
# Auto-deletes config after use
deno task new:function add.config.ts

# Keep config for reuse
deno task new:function add.config.ts --keep
```

**This generates:**

- `add/index.ts` - Curried function with correct types and names
- `add/index.test.ts` - Test boilerplate

### Choosing Conjunctions

The `conjunction` field determines inner function naming. Use this decision tree:

#### Decision Tree for Conjunction Selection

**1. Is the first parameter a FUNCTION?**

- ✅ Yes → Use **"With"**
  - `map(fn)` → `mapWithFunction`
  - `filter(predicate)` → `filterWithPredicate`
  - `reduce(reducer)` → `reduceWithReducer`

**2. Is the first parameter applied TO the second (like mathematical operations)?**

- ✅ Yes → Use **"To"**
  - `add(5)` → `addTo5` (add 5 TO something)
  - `multiply(3)` → `multiplyBy3` (multiply something BY 3)
  - `subtract(10)` → `subtractFrom10` (subtract FROM 10)

**3. Is the first parameter CONFIG/CONTEXT for the second?**

- ✅ Yes → Use **"For"**
  - `validate(rules)` → `validateForRules`
  - `format(options)` → `formatForOptions`
  - `parse(schema)` → `parseForSchema`

**Default:** When in doubt, use **"With"** - it's always readable.

#### Examples by Pattern

**Mathematical/Accumulation (To):**

```typescript
add(augend) → addToAugend(addend)
append(item) → appendToItem(array)
convertTo(unit) → convertValueTo(value)
```

**Configuration/Operation (With):**

```typescript
map(fn) → mapWithFunction(array)
sortBy(comparator) → sortByWithComparator(array)
parseWith(parser) → parseWithParser(text)
```

**Context/Rules (For):**

```typescript
validateFor(schema) → validateDataForSchema(data)
authorizeFor(permissions) → authorizeUserForPermissions(user)
```

**When conjunction doesn't matter:** Simple verb-noun pairs where either works. Choose what reads better.

### Programmatic API (Option 3)

For generating multiple functions or scripting:

```typescript
import { generateFunction } from "./.claude/skills/function-implementation/generator.ts"

await generateFunction({
	name: "add",
	conjunction: "To",
	parameters: [
		{ name: "augend", type: "number" },
		{ name: "addend", type: "number" },
	],
	returns: "number",
})
```

### Old Style (Still Supported)

```bash
deno task new:function add 2
```

Generates boilerplate with generic parameter names (`parameter1`, `parameter2`) that you must rename.

## Patterns

### Pattern 1: Unary Functions (Single Parameter)

Functions with a single logical parameter **ARE curried** (they take exactly one parameter). They are the simplest form of curried function: one parameter, direct return.

**When to use:** Type guards, predicates, simple transformations, single-input operations

**Structure:**

```typescript
//++ Brief description of what the function does
export default function functionName<T>(parameter: T): ReturnType {
	// implementation
}
```

**Example (from Toolsmith):**

```typescript
//++ Performs logical NOT operation on a value
//++ Negates the truthiness of any value
export default function not(value: Value): boolean {
	//++ [EXCEPTION] this is the ONLY permitted use of the ! operator
	//++ Everywhere else, use this `not` function instead
	return !value
}
```

**Example (type guard):**

```typescript
//++ Type guard that checks if a value is an Array
export default function isArray<T = unknown>(
	value: unknown,
): value is ReadonlyArray<T> {
	return Array.isArray(value)
}
```

**Key characteristics:**

- Single parameter only (already curried by definition)
- Returns value directly (not a higher-order function)
- Direct return
- Type annotations required
- Envoy comment (`//++`) describing purpose

### Pattern 2: Binary Functions (Two Parameters)

Functions with two logical parameters are **curried**: outer function takes first parameter, returns inner function that takes second parameter.

**When to use:** Array operations (map, filter), comparisons, binary operations, two-step transformations

**Structure:**

```typescript
//++ Brief description of what the function does
export default function functionName<T, U>(firstParameter: T) {
	return function functionNameWithFirstParameter(
		secondParameter: U,
	): ReturnType {
		// implementation using both parameters
	}
}
```

**Example (from Toolsmith):**

```typescript
//++ Filters array elements that satisfy predicate
//++ Returns Result with filtered array or error if input is invalid
export default function filter<T extends Serializable>(
	predicate: (item: T) => boolean,
) {
	return function filterWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		if (isArray(array)) {
			const filtered = array.filter(predicate)
			return ok(filtered)
		}

		return error({ code: "FILTER_INVALID_INPUT", ... })
	}
}
```

**Key characteristics:**

- Outer function takes configuration/operation parameter
- Inner function named meaningfully (e.g., `filterWithPredicate`)
- Inner function takes data parameter
- Enables partial application
- Data parameter comes last (see Parameter Order below)

### Pattern 3: Ternary Functions (Three Parameters)

Functions with three logical parameters are **doubly curried**: outer function returns function that returns function.

**When to use:** Reduce operations, three-step transformations, operations requiring function + config + data

**Structure:**

```typescript
//++ Brief description of what the function does
export default function functionName<T, U, V>(firstParameter: T) {
	return function functionNameWithFirstParameter(secondParameter: U) {
		return function functionNameWithFirstParameterAndSecondParameter(
			thirdParameter: V,
		): ReturnType {
			// implementation using all three parameters
		}
	}
}
```

**Example (from Toolsmith):**

```typescript
//++ Reduces array to a single value using a reducer function
export default function reduce<T, U>(fn: (accumulator: U, item: T) => U) {
	return function reduceWithFunction(initialValue: U) {
		return function reduceWithFunctionAndInitialValue(
			array: ReadonlyArray<T>,
		): U {
			// Happy path: plain array
			if (isArray<T>(array)) {
				return _reduceArray(fn)(initialValue)(array)
			}

			// Error handling...
		}
	}
}
```

**Key characteristics:**

- Two levels of nesting
- Each inner function accumulates parameters
- Inner function names describe what's been accumulated
- Data parameter always last
- Enables progressive partial application

### Pattern 4: Higher-Order Functions

Functions that take other functions as parameters and/or return functions.

**When to use:** Combinators, decorators, function composition, adapters

**Structure:**

```typescript
//++ Brief description of what the higher-order function does
export default function higherOrderFunction<T>(
	fn: (arg: T) => ReturnType,
) {
	return function higherOrderFunctionWithFunction(
		data: T,
	): ProcessedReturnType {
		// Use fn on data, possibly transforming or composing
	}
}
```

**Example (combinator):**

```typescript
//++ Combines multiple predicates with logical AND
export default function allPass<T>(predicates: ReadonlyArray<Predicate<T>>) {
	return function allPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)
		return predicates.every(applyPredicate)
	}
}
```

**Key characteristics:**

- Function parameters use function type annotations
- Extract callbacks to private helpers (never inline)
- Use currying to capture outer scope in helpers
- Pass helper references to array methods

### Pattern 5: Function Overloads

Functions that behave differently based on input type, using TypeScript function overloads.

**When to use:** Functions that operate on plain values OR monads (Maybe, Result, Validation)

**Structure:**

```typescript
//++ Brief description
export default function functionName<T, U>(fn: (arg: T) => U) {
	//++ [OVERLOAD] Plain value version
	function innerFunction(data: T): U

	//++ [OVERLOAD] Result monad version
	function innerFunction(data: Result<E, T>): Result<E, U>

	//++ Implementation handles all overload cases
	function innerFunction(data: T | Result<E, T>): U | Result<E, U> {
		if (isOk(data)) {
			// Handle Result
		}
		// Handle plain value
	}

	return innerFunction
}
```

**Example (from Toolsmith):**

```typescript
//++ Transforms each array element using a function
export default function map<T, U>(f: (arg: T) => U) {
	//++ [OVERLOAD] Array mapper: takes array, returns mapped array
	function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result mapper: takes and returns Result monad
	function mapWithFunction(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function mapWithFunction(
		array: ReadonlyArray<T> | Result<ValidationError, ReadonlyArray<T>>,
	): ReadonlyArray<U> | Result<ValidationError, ReadonlyArray<U>> {
		if (isArray<T>(array)) {
			return _mapArray(f)(array)
		}

		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_mapToResult(f))(array)
		}

		return array
	}

	return mapWithFunction
}
```

**Key characteristics:**

- Overload signatures come first
- Implementation signature is last and most general
- Envoy comments on each overload
- Type guards distinguish between cases

## Parameter Order

**Critical principle: Data comes last.**

This enables partial application and composition:

```typescript
// ✅ Correct: operation → data
function map<T, U>(fn: (item: T) => U) {
	return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
		// ...
	}
}

// Usage: partially apply operation, then apply to data
const doubleNumbers = map((n: number) => n * 2)
const result = doubleNumbers([1, 2, 3]) // [2, 4, 6]
```

**Parameter order rules:**

1. **Functions/operations first** - Configuration for the operation
2. **Configuration/options next** - Settings, initial values, flags
3. **Data last** - The actual data being operated on

**Examples:**

```typescript
// reduce: fn → initialValue → array
reduce(sumFn)(0)(numbers)

// filter: predicate → array
filter(isEven)(numbers)

// map: fn → array
map(double)(numbers)
```

**Why data last?**

- Enables partial application (pre-configure operation, apply later)
- Enables function composition with pipe/compose
- Matches mathematical convention (f(g(x)))
- Allows creating reusable operations

## Naming Inner Functions

Inner function names must be **meaningful and descriptive**, showing what parameters have been accumulated.

**Naming patterns:**

### "With" Pattern

Use "With" to show what configuration/parameters have been accumulated:

```typescript
function map<T, U>(fn: (item: T) => U) {
	return function mapWithFunction(array: ReadonlyArray<T>) { ... }
}

function filter<T>(predicate: (item: T) => boolean) {
	return function filterWithPredicate(array: ReadonlyArray<T>) { ... }
}

function reduce<T, U>(fn: (acc: U, item: T) => U) {
	return function reduceWithFunction(initialValue: U) {
		return function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>) { ... }
	}
}
```

### "To" Pattern

Use "To" for transformation functions:

```typescript
function convertToString(value: number) {
	return function convertValueToString(format: Format): string { ... }
}

function addToAugend(addend: number): number { ... }
```

### "For" Pattern

Use "For" when applying to specific context:

```typescript
function validateForUser(rules: Rules) {
	return function validateDataForUser(data: Data) { ... }
}
```

**Never use:**

- Generic names like `inner`, `fn`, `result`
- Underscore prefix (that's for private helpers only)
- Single letters like `f`, `g`, `h`
- Abbreviations like `withFn`, `withCfg`

## Type Annotations

**All parameters and return types must have explicit type annotations.**

### Parameter Types

```typescript
// ✅ Correct: explicit types
function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

// ❌ Wrong: missing types
function add(augend) {
	return function addToAugend(addend) {
		return augend + addend
	}
}
```

### Return Types

```typescript
// ✅ Correct: explicit return type
function isEven(n: number): boolean {
	return n % 2 === 0
}

// ❌ Wrong: inferred return type
function isEven(n: number) {
	return n % 2 === 0
}
```

### Generic Types

Use generics for reusable, type-safe functions:

```typescript
// ✅ Correct: generic with constraints
function map<T, U>(fn: (item: T) => U) {
	return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
		// ...
	}
}

// ✅ Correct: generic with constraints
function identity<T extends Serializable>(value: T): T {
	return value
}
```

### Type Aliases for Clarity

Extract complex types to type aliases:

```typescript
export type Predicate<T> = (value: T) => boolean
export type Predicates<T> = ReadonlyArray<Predicate<T>>

export default function allPass<T>(predicates: Predicates<T>) {
	return function allPassWithPredicates(value: T): boolean {
		// ...
	}
}
```

## Envoy Comments

All functions must have Envoy documentation comments using `//++` syntax.

**Structure:**

```typescript
//++ Brief description of what the function does (one line)
//++ Optional additional details or usage notes
//++ [EXCEPTION] Note any constitutional rule exceptions with justification
export default function functionName(...) {
	//++ [OVERLOAD] Description of this overload
	function innerFunction(...): ReturnType

	//++ Implementation description
	function innerFunction(...): ReturnType {
		//++ Explain non-obvious implementation details
		// ...
	}
}
```

**Example:**

```typescript
//++ Filters array elements that satisfy predicate
//++ Returns Result with filtered array or error if input is invalid
export default function filter<T extends Serializable>(
	predicate: (item: T) => boolean,
) {
	return function filterWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		//++ Happy path: valid array
		if (isArray(array)) {
			const filtered = array.filter(predicate)
			return ok(filtered)
		}

		//++ Sad path: not an array
		return error({ code: "FILTER_INVALID_INPUT", ... })
	}
}
```

## Common Violations

### ❌ Never Use Arrow Functions

```typescript
// ❌ Wrong: arrow function
const add = (a: number, b: number) => a + b

// ✅ Correct: named function declaration
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
```

### ❌ Never Take Multiple Parameters Without Currying

```typescript
// ❌ Wrong: multiple parameters, not curried
export default function add(augend: number, addend: number): number {
	return augend + addend
}

// ✅ Correct: binary function (curried, returns higher-order function)
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

// ✅ Correct: unary function (already curried, one parameter)
export default function negate(n: number): number {
	return -n
}
```

### ❌ Never Use Generic Inner Function Names

```typescript
// ❌ Wrong: generic name
export default function map<T, U>(fn: (item: T) => U) {
	return function inner(array: ReadonlyArray<T>): ReadonlyArray<U> { ... }
}

// ✅ Correct: meaningful name
export default function map<T, U>(fn: (item: T) => U) {
	return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> { ... }
}
```

### ❌ Never Put Data Parameter First

```typescript
// ❌ Wrong: data first
export default function map<T, U>(array: ReadonlyArray<T>) {
	return function mapArray(fn: (item: T) => U): ReadonlyArray<U> { ... }
}

// ✅ Correct: data last
export default function map<T, U>(fn: (item: T) => U) {
	return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> { ... }
}
```

### ❌ Never Inline Callbacks

```typescript
// ❌ Wrong: inline callback in every()
export default function allPass<T>(predicates: Predicates<T>) {
	return function allPassWithPredicates(value: T): boolean {
		return predicates.every((predicate) => predicate(value))
	}
}

// ✅ Correct: extracted helper
export default function allPass<T>(predicates: Predicates<T>) {
	return function allPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)
		return predicates.every(applyPredicate)
	}
}

// In _applyPredicate/index.ts:
export default function _applyPredicate<T>(value: T) {
	return function applyPredicateToValue(predicate: Predicate<T>): boolean {
		return predicate(value)
	}
}
```

### ❌ Never Omit Type Annotations

```typescript
// ❌ Wrong: inferred types
export default function add(augend) {
	return function addToAugend(addend) {
		return augend + addend
	}
}

// ✅ Correct: explicit types
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
```

## Examples

Examine examples in `examples/` folder and in Toolsmith library:

**Unary (curried, returns value):**

- `toolsmith/src/predicates/isArray/index.ts`
- `toolsmith/src/logic/not/index.ts`
- `toolsmith/src/predicates/isString/index.ts`

**Binary (curried, returns function):**

- `toolsmith/src/array/map/index.ts`
- `toolsmith/src/array/filter/index.ts`
- `toolsmith/src/comparison/is/index.ts`

**Ternary (curried, returns function that returns function):**

- `toolsmith/src/array/reduce/index.ts`

**Higher-order:**

- `toolsmith/src/validation/allPass/index.ts`
- `toolsmith/src/validation/anyPass/index.ts`

## Implementation Patterns

**CRITICAL:** The skill above covers STRUCTURE. This section covers what goes INSIDE the function body.

### Constitutional Rules Reminder

When implementing function bodies, you MUST follow these rules:

1. **No loops** - Use `map`, `filter`, `reduce` from Toolsmith
2. **No mutations** - Use spread operators, immutable updates
3. **No exceptions** - Return `Result<T, E>` or `Validation<T, E>`
4. **No arrow functions** - Extract callbacks to helper functions
5. **Pure functions** - Same input always produces same output

### When to Return Result vs Plain Values

**Return plain values when:**

- Operation cannot fail (pure computation)
- Input is guaranteed valid by types
- No external dependencies

```typescript
// ✅ Plain value - cannot fail
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}
```

**Return Result<T, E> when:**

- Operation can fail (validation, parsing, IO)
- Input needs validation
- Error handling is required

```typescript
// ✅ Result - can fail
export default function divide(dividend: number) {
	return function divideDividendBy(
		divisor: number,
	): Result<ValidationError, number> {
		if (divisor === 0) {
			return error({
				code: "DIVISION_BY_ZERO",
				field: "divisor",
				messages: ["Cannot divide by zero"],
			})
		}
		return ok(dividend / divisor)
	}
}
```

### Error Handling Patterns

**Never use try/catch/throw:**

```typescript
// ❌ WRONG - uses exceptions
function parseJson(text: string) {
	try {
		return JSON.parse(text)
	} catch (e) {
		throw new Error("Invalid JSON")
	}
}

// ✅ CORRECT - uses Result
function parseJson(text: string): Result<ValidationError, unknown> {
	// Use a library that returns Result, or wrap:
	// Implementation would go here
	return ok(parsed)
}
```

### Validation Patterns

**Validate inputs and return early:**

```typescript
export default function processUser(
	user: unknown,
): Result<ValidationError, ProcessedUser> {
	// Validate input type
	if (!isObject(user)) {
		return error({
			code: "INVALID_USER_TYPE",
			field: "user",
			messages: ["User must be an object"],
		})
	}

	// Validate required fields
	if (isEmpty(user.name)) {
		return error({
			code: "MISSING_NAME",
			field: "name",
			messages: ["User name is required"],
		})
	}

	// Process valid input
	return ok({ processedName: user.name })
}
```

### Iteration Patterns

**Never use loops - use Toolsmith functions:**

```typescript
// ❌ WRONG - uses for loop
function doubleNumbers(numbers: ReadonlyArray<number>): ReadonlyArray<number> {
	const result = []
	for (let i = 0; i < numbers.length; i++) {
		result.push(numbers[i] * 2)
	}
	return result
}

// ✅ CORRECT - uses map
import map from "@sitebender/toolsmith/array/map/index.ts"

function doubleNumbers(numbers: ReadonlyArray<number>): ReadonlyArray<number> {
	return map(multiplyBy2)(numbers)
}

function multiplyBy2(n: number): number {
	return n * 2
}
```

### Callback Extraction Pattern

**Never inline callbacks - extract to helper functions:**

```typescript
// ❌ WRONG - inline arrow function
export default function findEven(
	numbers: ReadonlyArray<number>,
): ReadonlyArray<number> {
	return numbers.filter((n) => n % 2 === 0)
}

// ✅ CORRECT - extracted helper
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import _isEven from "./_isEven/index.ts"

export default function findEven(
	numbers: ReadonlyArray<number>,
): ReadonlyArray<number> {
	return filter(_isEven)(numbers)
}

// In _isEven/index.ts:
export default function _isEven(n: number): boolean {
	return n % 2 === 0
}
```

### Common Imports from Toolsmith

**Monads:**

```typescript
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
```

**Array operations:**

```typescript
import map from "@sitebender/toolsmith/array/map/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import isEmpty from "@sitebender/toolsmith/array/isEmpty/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
```

**Logic operations:**

```typescript
import not from "@sitebender/toolsmith/logic/not/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
```

**Predicates:**

```typescript
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import isObject from "@sitebender/toolsmith/predicates/isObject/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import allPass from "@sitebender/toolsmith/validation/allPass/index.ts"
import anyPass from "@sitebender/toolsmith/validation/anyPass/index.ts"
```

### Implementation Checklist

When implementing function body, verify:

1. ✅ No loops (`for`, `while`) - use `map`/`filter`/`reduce`
2. ✅ No mutations - use spread operators
3. ✅ No exceptions - return `Result` or `Validation`
4. ✅ No arrow functions - extract callbacks
5. ✅ Imports from Toolsmith for operations
6. ✅ Early returns for validation
7. ✅ Type guards for narrowing
8. ✅ Helper functions in `_subfolder/`

## Cross-References

**References:**

- naming skill - For function and parameter naming conventions
- abbreviations skill - For avoiding unapproved abbreviations
- operator-substitutions skill - For using Toolsmith functions instead of operators
- sitebender-predicates skill - For predicate-specific patterns
- error-handling skill - For Result/Validation monad usage
- file-system-organization skill - For helper function placement

**Referenced by:**

- All other skills that involve writing functions
- error-handling skill - Uses function patterns
- testing skill - Tests functions following these patterns
