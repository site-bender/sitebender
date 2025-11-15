---
name: three-path-pattern
description: Implements Toolsmith functions using the three-path pattern (Maybe/Result/Validation). Use when creating or converting functions for the Toolsmith library. Ensures currying, function keyword syntax, immutability, and constitutional compliance. NOT for predicates. Work on ONE function at a time.
---

# Three-Path Pattern Implementation

## ⚠️ CRITICAL WORKFLOW REQUIREMENT ⚠️

**WORK ON ONE FUNCTION AT A TIME. NO SHORTCUTS. NO BATCHING. NO AGENTS. NO SCRIPTS TO "AUTOMATE" MULTIPLE FUNCTIONS. THIS IS NOT OPTIONAL!**

Implement a SINGLE function (including helpers) carefully, completely, and correctly. Do not attempt to speed up the process by working on multiple functions, using agents, or taking any shortcuts. The architect has wasted months cleaning up messes from shortcuts. Follow this process exactly.

**THE SKILL IS NOT COMPLETE UNTIL ALL TESTS PASS, LINTING PASSES, AND TYPE CHECKS PASS. NO CHEATING.**

---

## When to Use This Skill

Use this skill when:

- Creating new Toolsmith library functions
- Converting existing functions to three-path pattern
- ANY function that needs to work with Result or Validation monads

DO NOT use this skill for:

- Predicates (single-path, return boolean)
- Functions already implemented with three-path pattern
- Non-Toolsmith code

---

## What is the Three-Path Pattern?

The three-path pattern allows a single function to work in three different monadic contexts by detecting input type at runtime and routing to the appropriate implementation. All three paths are essential for composition chains where earlier operations might return Nothing/Error/Failure.

### The Three Paths

1. **Maybe Path**: Takes `Maybe<T>`, returns `Maybe<U>`
   - For composition chains where value might not exist
   - Returns `Nothing` when input is `Nothing` or operation fails
   - Returns `Just(value)` on success
   - Used when you don't need detailed error information
   - Example (array): `map(double)(just([1, 2, 3]))` → `just([2, 4, 6])`
   - Example (string): `toUpperCase(just("hello"))` → `just("HELLO")`
   - Example: `map(double)(nothing())` → `nothing()`

2. **Result Path**: Takes `Result<E, T>`, returns `Result<E, U>`
   - Fail-fast error handling with detailed error context
   - Single error stops processing
   - Returns `Error` with structured error object
   - Used in pipelines where you need error details
   - Example (array): `map(double)(ok([1, 2, 3]))` → `ok([2, 4, 6])`
   - Example (number): `sqrt(ok(4))` → `ok(2)`
   - Example: `map(double)(error({code: "ERR"}))` → `error({code: "ERR"})`

3. **Validation Path**: Takes `Validation<E, T>`, returns `Validation<E, U>`
   - Error accumulation with detailed error context
   - Collects all errors for comprehensive feedback
   - Returns `Failure` with array of error objects
   - Used in form validation
   - Example (array): `map(double)(success([1, 2, 3]))` → `success([2, 4, 6])`
   - Example (object): `validateUser(success({name: "Alice"}))` → `success({name: "Alice"})`
   - Example: `map(double)(failure([{code: "ERR"}]))` → `failure([{code: "ERR"}])`

---

## Constitutional Requirements

ALL code MUST follow these rules:

1. ✅ **No classes** - Use pure functions only
2. ✅ **No mutations** - `ReadonlyArray<T>`, no `.push()`, etc.
3. ✅ **No loops** - Already using native methods (which are internal loops)
4. ✅ **No exceptions** - Return Nothing/Error/Failure, **EXCEPT**:
   - **[EXCEPTION]** try/catch permitted ONLY to wrap user-provided functions
   - Must convert exceptions to Nothing/Error/Failure
   - Must document with `[EXCEPTION]` comment
5. ✅ **Never use `null` in data** - `null` is forbidden as a data value
   - Use `undefined` for absent values in data structures
6. ✅ **One function per file** - Each file exports exactly one function
7. ✅ **Pure functions** - Same input → same output
8. ✅ **No arrow functions** - Use `function` keyword only
9. ✅ **All functions curried** - One parameter per function (curried functions are not necessarily higher order!)
10. ✅ **All functions fully tested** - Use TDD, all tests pass before completion, 100% coverage

---

## Two Categories of Three-Path Functions

### Category 1: Functions WITHOUT Function Parameters

Most Toolsmith functions fall into this category. They perform operations that might fail but don't accept user-provided functions.

**Examples:**

- `parseJson(jsonString)` - Parse can fail with malformed JSON
- `sqrt(number)` - Can fail with negative numbers
- `clamp(min)(max)(value)` - Can fail with invalid ranges
- `at(index)(array)` - Can fail with out-of-bounds index

**Pattern:** Simple three-path routing, no try/catch wrapping needed:

```typescript
function _functionNameToMaybe<T, U>(input: T): Maybe<U> {
	// Happy path: validate inputs
	if (isValidInput(input)) {
		const result = performOperation(input)
		return just(result)
	}

	// Sad path: invalid input
	return nothing()
}
```

### Category 2: Functions WITH User-Provided Function Parameters

Higher-order functions that accept predicates, transformers, or reducers MUST validate and safely wrap user-provided functions.

**Examples:**

- `map(userFunction)(array)` - User provides transformer
- `filter(userPredicate)(array)` - User provides predicate
- `reduce(userReducer)(initialValue)(array)` - User provides reducer

**Why Wrapping is Required:**

- User might pass non-function value
- Function might return wrong type
- Function might throw exceptions

**Built-in predicates** (`isFiniteNumber`, `isArray`, etc.) do NOT need wrapping - they handle `unknown` safely.

### The Wrapping Pattern (Category 2 Only)

```typescript
function _functionNameToMaybe<T, U>(userFunction: (item: T) => U) {
	return function (input: T): Maybe<U> {
		/*++
     + [EXCEPTION] try/catch permitted to wrap user-provided function.
     + User functions are untrusted external code that may:
     + - Not be a function
     + - Return wrong type
     + - Throw exceptions
     */
		try {
			// Happy path: validate is function
			if (isFunction(userFunction)) {
				// Execute user function
				const result = userFunction(input)

				// Happy path: validate return type if needed
				if (isExpectedType(result)) {
					return just(result)
				}
			}

			// Any validation failure falls through
			return nothing()
		} catch (err) {
			// Convert exception to Nothing
			return nothing()
		}
	}
}
```

### Error Handling by Path

**Maybe path:** Return `nothing()` on any error

**Result path:** Return descriptive `error({...})` with:

- `INVALID_PREDICATE` / `INVALID_FUNCTION` - not a function
- `PREDICATE_NON_BOOLEAN` / `FUNCTION_WRONG_TYPE` - wrong return type
- `PREDICATE_THREW` / `FUNCTION_THREW` - exception thrown

**Validation path:** Return `failure([{...}])` with same error codes

---

## Implementation Process

### Step 1: Understand the Function Requirements

Before writing code, answer:

- What does this function do?
- What parameters does it need?
- What type transformations occur?
- What native JS method will it wrap (if any)?
- What is the return type?

### Step 2: Create Directory Structure

```
functionName/
  _functionNameToMaybe/
    index.ts
    index.test.ts
  _functionNameToResult/
    index.ts
    index.test.ts
  _functionNameToValidation/
    index.ts
    index.test.ts
  index.ts
  index.test.ts
```

**Optional**: Use the generator script to scaffold:

```bash
# For array functions:
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/array "Function description"

# For string functions:
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/string "Function description"

# For other domains (number, object, etc.):
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/DOMAIN "Function description"
```

### Step 3: Write Tests FIRST (TDD Approach)

**CRITICAL: Write tests BEFORE implementing the function.** This is Test-Driven Development.

Create `index.test.ts` with test cases for all three paths:

- Maybe monad tests (just and nothing passthrough)
- Result monad tests (ok and error passthrough)
- Validation monad tests (success and failure passthrough)
- Property-based tests

**Use the `testing` skill** for comprehensive test patterns. Reference:

- `references/reduce-example.md` - Complete test examples
- `references/map-example.md` - Complete test examples
- `.claude/skills/testing/skill.md` - Testing patterns and best practices

Tests will fail initially - this is expected in TDD.

### Step 4: Implement Private Helpers (Bottom-Up) WITH TESTS

**CRITICAL: You MUST create tests for EACH helper IMMEDIATELY after implementing it. NO EXCEPTIONS.**

Every file starts with this comment:

```typescript
/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + [Description of what this function/helper does]
 */
```

#### 4a. Implement `_functionNameToMaybe/index.ts` (Maybe path)

1. Write the implementation with try/catch wrapping for user-provided functions (see `references/reduce-example.md` and `references/map-example.md`)
2. **STOP - DO NOT PROCEED TO NEXT HELPER**
3. Create `_functionNameToMaybe/index.test.ts`
4. Write comprehensive tests:
   - Basic functionality tests (minimum 4 test cases)
   - Invalid input tests (invalid predicate/function, throws exception)
   - Nothing passthrough tests
   - Property-based tests (minimum 2)
5. Run: `deno test --no-check libraries/toolsmith/src/DOMAIN/functionName/_functionNameToMaybe/index.test.ts`
6. **ALL TESTS MUST PASS - If any fail, fix them NOW**
7. Run: `deno fmt libraries/toolsmith/src/DOMAIN/functionName/_functionNameToMaybe/`
8. **ONLY AFTER ALL TESTS PASS, proceed to 4b**

#### 4b. Implement `_functionNameToResult/index.ts` (Result path)

1. Write the implementation (see `references/reduce-example.md` and `references/map-example.md`)
2. **STOP - DO NOT PROCEED TO NEXT HELPER**
3. Create `_functionNameToResult/index.test.ts`
4. Write comprehensive tests:
   - Ok path tests (minimum 3)
   - Error path tests for invalid inputs (minimum 2)
   - Property-based tests (minimum 2)
5. Run: `deno test --no-check libraries/toolsmith/src/DOMAIN/functionName/_functionNameToResult/index.test.ts`
6. **ALL TESTS MUST PASS - If any fail, fix them NOW**
7. Run: `deno fmt libraries/toolsmith/src/DOMAIN/functionName/_functionNameToResult/`
8. **ONLY AFTER ALL TESTS PASS, proceed to 4c**

#### 4c. Implement `_functionNameToValidation/index.ts` (Validation path)

1. Write the implementation (see `references/reduce-example.md` and `references/map-example.md`)
2. **STOP - DO NOT PROCEED TO NEXT STEP**
3. Create `_functionNameToValidation/index.test.ts`
4. Write comprehensive tests:
   - Success path tests (minimum 3)
   - Failure path tests for invalid inputs (minimum 2)
   - Property-based tests (minimum 2)
5. Run: `deno test --no-check libraries/toolsmith/src/DOMAIN/functionName/_functionNameToValidation/index.test.ts`
6. **ALL TESTS MUST PASS - If any fail, fix them NOW**
7. Run: `deno fmt libraries/toolsmith/src/DOMAIN/functionName/_functionNameToValidation/`
8. **ONLY AFTER ALL TESTS PASS, proceed to Step 5**

### Step 5: Implement Main Function

Implement `index.ts` with three overloads and runtime routing.

See `references/reduce-example.md` and `references/map-example.md` for complete examples.
See `references/type-signatures.md` for complete type patterns.

Run tests after implementing to verify all paths work correctly.

### Step 6: Verify Everything Passes

Run these commands and ensure ALL pass:

```bash
# Format code
deno task fmt

# Lint code
deno task lint

# Type check
deno task check

# Run tests - ALL MUST PASS
deno test libraries/toolsmith/src/DOMAIN/functionName/index.test.ts
```

**If any command fails, fix the issues before proceeding. The skill is NOT complete until all tests pass, linting passes, and type checks pass.**

---

## Currying and Naming Conventions

### Currying Rules

Every function takes **exactly one parameter**:

```typescript
function functionName(param1: Type1)                          // ONE parameter
  return function functionNameWithParam1(param2: Type2)       // ONE parameter
    function functionNameWithParam1AndParam2(array: Array)    // ONE parameter
```

### Naming Convention

Pattern: `[baseName]With[Param1][And[Param2]][And[Param3]]...`

Examples:

- `map` → `mapWithFunction`
- `reduce` → `reduceWithFunction` → `reduceWithFunctionAndInitialValue`
- `filter` → `filterWithPredicate`

Parameter names use PascalCase in function names:

- `function` → `WithFunction`
- `initialValue` → `WithInitialValue`
- `compareFn` → `WithCompareFn`

---

## Type Signatures

### Generic Type Parameters

Standard pattern:

- `E` = Error type
- `T` = Input item type
- `U` = Output/transformed type

### Overload Pattern

Always three overloads in this exact order:

```typescript
// 1. Maybe overload
function name(input: Maybe<T>): Maybe<U>

// 2. Result overload
function name(input: Result<E, T>): Result<E, U>

// 3. Validation overload
function name(input: Validation<E, T>): Validation<E, U>

// 4. Implementation (union of all three)
function name(
	input:
		| Maybe<T>
		| Result<E, T>
		| Validation<E, T>,
): Maybe<U> | Result<E, U> | Validation<E, U>
```

**Notes:**

- `T` = Input type (could be `ReadonlyArray<number>`, `string`, `number`, `Object`, etc.)
- `U` = Output type (transformation result)
- `E` = Error type (for Result/Validation paths)

See `references/type-signatures.md` for comprehensive type patterns.

---

## Error Structures

### Result Errors: `error(singleObject)`

```typescript
return error({
	code: "FUNCTION_SPECIFIC_CODE",
	field: "fieldName",
	messages: ["Human-readable error message"],
	received: typeof value,
	expected: "ExpectedType",
	suggestion: "What to do instead",
	severity: "requirement" as const,
} as E)
```

### Validation Errors: `failure([object])`

```typescript
return failure([{
	code: "FUNCTION_SPECIFIC_CODE",
	field: "fieldName",
	messages: ["Human-readable error message"],
	received: typeof value,
	expected: "ExpectedType",
	suggestion: "What to do instead",
	severity: "requirement" as const,
} as E])
```

**Key Difference**: Result uses single object, Validation uses array of objects.

See `references/error-structures.md` for complete error patterns.

---

## Common Imports

### Always Import

```typescript
// Types
import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

// Predicates for type routing
import isJust from "../../monads/maybe/isJust/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

// Chain functions
import chainMaybes from "../../monads/maybe/chain/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
```

### Import as Needed

```typescript
// Logic
import and from "../../logic/and/index.ts"

// Predicates
import isFunction from "../../predicates/isFunction/index.ts"

// Maybe constructors
import just from "../../monads/maybe/just/index.ts"
import nothing from "../../monads/maybe/nothing/index.ts"

// Result constructors
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"

// Validation constructors
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
```

---

## References

For complete working examples:

- **references/reduce-example.md** - Complete reduce implementation
- **references/map-example.md** - Complete map implementation
- **references/type-signatures.md** - Type patterns and overload signatures
- **references/error-structures.md** - Error object templates

---

## Generator Script

To scaffold file structure:

```bash
# For array functions:
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/array "Function description"

# For string functions:
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/string "Function description"

# For other domains:
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/DOMAIN "Function description"
```

This creates directory structure and template files with TODO placeholders. You must implement the logic manually.

---

## MANDATORY PRE-PRESENTATION VERIFICATION

**RUN THIS CHECKLIST BEFORE PRESENTING CODE TO USER. IF ANY ITEM FAILS, DO NOT PRESENT.**

### File Existence Check

Verify ALL these files exist:

- [ ] `_functionNameToMaybe/index.ts` file exists
- [ ] `_functionNameToMaybe/index.test.ts` file exists (**REQUIRED**)
- [ ] `_functionNameToResult/index.ts` file exists
- [ ] `_functionNameToResult/index.test.ts` file exists (**REQUIRED**)
- [ ] `_functionNameToValidation/index.ts` file exists
- [ ] `_functionNameToValidation/index.test.ts` file exists (**REQUIRED**)
- [ ] Main `index.ts` file exists
- [ ] Main `index.test.ts` file exists (**REQUIRED**)

**If ANY test file is missing, STOP. Create it NOW. Do not present code without test files.**

### Test Execution Check

Run: `deno test --no-check libraries/toolsmith/src/DOMAIN/functionName/`

Verify ALL tests pass:

- [ ] `_functionNameToMaybe` tests: **ALL PASS** (0 failures)
- [ ] `_functionNameToResult` tests: **ALL PASS** (0 failures)
- [ ] `_functionNameToValidation` tests: **ALL PASS** (0 failures)
- [ ] Main function tests: **ALL PASS** (0 failures)
- [ ] **Total: 0 failed tests**

**If ANY test fails, STOP. Fix the failures NOW. Do not present code with failing tests.**

### Code Quality Check

- [ ] `deno fmt libraries/toolsmith/src/DOMAIN/functionName/` - No changes needed (already formatted)
- [ ] Code passes linting (if applicable)
- [ ] Type checking passes or `--no-check` justified

### Test Coverage Check

- [ ] Maybe path tested (minimum 4 test cases in `_functionNameToMaybe/index.test.ts`)
- [ ] Result path tested (minimum 5 test cases in `_functionNameToResult/index.test.ts`)
- [ ] Validation path tested (minimum 5 test cases in `_functionNameToValidation/index.test.ts`)
- [ ] Property-based tests included (minimum 2 per helper)
- [ ] Invalid input tests included (for each helper)
- [ ] Exception handling tests (user function throws)
- [ ] Nothing/error/failure passthrough tests in main `index.test.ts`

**IF ANY BOX ABOVE IS UNCHECKED, DO NOT PRESENT CODE. FIX THE ISSUE FIRST.**

---

## Final Checklist

Before presenting code - **ALL items must be checked:**

**Helper Functions (CRITICAL - MUST BE TESTED):**

- [ ] `_functionNameToMaybe/index.ts` implemented **AND TESTED**
- [ ] `_functionNameToMaybe/index.test.ts` exists with **ALL tests passing**
- [ ] `_functionNameToResult/index.ts` implemented **AND TESTED**
- [ ] `_functionNameToResult/index.test.ts` exists with **ALL tests passing**
- [ ] `_functionNameToValidation/index.ts` implemented **AND TESTED**
- [ ] `_functionNameToValidation/index.test.ts` exists with **ALL tests passing**

**Testing (MANDATORY - do not present code if any test fails):**

- [ ] Tests written FIRST before implementation (TDD)
- [ ] **ALL helper tests pass independently** (run each `index.test.ts` separately)
- [ ] Main function tests cover all three paths (Maybe, Result, Validation)
- [ ] Tests include nothing/error/failure passthrough cases
- [ ] Tests include exception handling (user function throws)
- [ ] Property-based tests included
- [ ] Run `deno test --no-check libraries/toolsmith/src/DOMAIN/functionName/` shows **0 failures**
- [ ] `deno task fmt` passes - code is formatted
- [ ] `deno task lint` passes - no linting errors in the code under development
- [ ] `deno task check` passes - TypeScript types valid in the code under development

**Constitutional Compliance:**

- [ ] Directory structure correct (_functionNameToMaybe, _functionNameToResult, _functionNameToValidation)
- [ ] All functions curried (one parameter each)
- [ ] Function keyword only (no arrows in implementation)
- [ ] Proper naming convention (With/And pattern)
- [ ] No classes, no mutations, no loops
- [ ] No exceptions EXCEPT try/catch wrapping user functions (with `[EXCEPTION]` comment)
- [ ] `ReadonlyArray<T>` everywhere for immutability
- [ ] `[EXCEPTION]` comment at top of each file
- [ ] User-provided functions validated and wrapped in try/catch
- [ ] Never use `null` in data (only `undefined` for absent values)

**Type Safety:**

- [ ] Three overloads in main function
- [ ] Runtime type checking routing (isArray, isOk, isSuccess)
- [ ] Error structures correct (single object for Result, array for Validation)

**DO NOT present code to the user until ALL items are checked. If updating an existing function, add tests if they don't exist.**

---

**Remember: ONE FUNCTION AT A TIME. NO SHORTCUTS. FOLLOW THE PROCESS EXACTLY. ALL TESTS MUST PASS.**
