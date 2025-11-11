---
name: three-path-pattern
description: Implements Toolsmith functions using the three-path pattern (plain/Result/Validation). Use when creating or converting functions for the Toolsmith library. Ensures currying, function keyword syntax, immutability, and constitutional compliance. NOT for predicates. Work on ONE function at a time.
---

# Three-Path Pattern Implementation

## ⚠️ CRITICAL WORKFLOW REQUIREMENT ⚠️

**WORK ON ONE FUNCTION AT A TIME. NO SHORTCUTS. NO BATCHING. NO AGENTS. NO SCRIPTS TO "AUTOMATE" MULTIPLE FUNCTIONS.**

Implement a SINGLE function carefully, completely, and correctly. Do not attempt to speed up the process by working on multiple functions, using agents, or taking any shortcuts. The architect has wasted months cleaning up messes from shortcuts. Follow this process exactly.

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

The three-path pattern allows a single function to work in three different error-handling contexts by detecting input type at runtime and routing to the appropriate implementation.

### The Three Paths

1. **Plain Path**: Takes `ReadonlyArray<T>`, returns plain value or array
   - No error handling
   - Direct computation
   - Fastest path
   - Example: `map(double)([1, 2, 3])` → `[2, 4, 6]`

2. **Result Path**: Takes `Result<E, ReadonlyArray<T>>`, returns `Result<E, U>`
   - Fail-fast error handling
   - Single error stops processing
   - Used in pipelines
   - Example: `map(double)(ok([1, 2, 3]))` → `ok([2, 4, 6])`

3. **Validation Path**: Takes `Validation<E, ReadonlyArray<T>>`, returns `Validation<E, U>`
   - Error accumulation
   - Collects all errors
   - Used in form validation
   - Example: `map(double)(success([1, 2, 3]))` → `success([2, 4, 6])`

---

## Constitutional Requirements

ALL code MUST follow these rules:

1. ✅ **No classes** - Use pure functions only
2. ✅ **No mutations** - `ReadonlyArray<T>`, no `.push()`, etc.
3. ✅ **No loops** - Already using native methods (which are internal loops)
4. ✅ **No exceptions** - Return Result/Validation errors
5. ✅ **One function per file** - Each file exports exactly one function
6. ✅ **Pure functions** - Same input → same output
7. ✅ **No arrow functions** - Use `function` keyword only
8. ✅ **All functions curried** - One parameter per function
9. ✅ **All functions fully tested** - Use TDD, all tests pass before completion

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
  _functionNameArray/
    index.ts
  _functionNameToResult/
    index.ts
  _functionNameToValidation/
    index.ts
  index.ts
  index.test.ts
```

**Optional**: Use the generator script to scaffold:

```bash
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/array "Function description"
```

### Step 3: Write Tests FIRST (TDD Approach)

**CRITICAL: Write tests BEFORE implementing the function.** This is Test-Driven Development.

Create `index.test.ts` with test cases for all three paths:
- Plain array tests
- Result monad tests (ok and error passthrough)
- Validation monad tests (success and failure passthrough)
- Property-based tests

**Use the `testing` skill** for comprehensive test patterns. Reference:
- `references/reduce-example.md` - Complete test examples
- `references/map-example.md` - Complete test examples
- `.claude/skills/testing/skill.md` - Testing patterns and best practices

Tests will fail initially - this is expected in TDD.

### Step 4: Implement Private Helpers (Bottom-Up)

Now implement helpers to make tests pass, in this order:
1. `_functionNameArray/index.ts` (plain path)
2. `_functionNameToResult/index.ts` (Result path)
3. `_functionNameToValidation/index.ts` (Validation path)

Run tests after each helper to verify correctness.

#### Comment Format

Every file starts with:

```typescript
/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + [Description of what this function/helper does]
 */
```

#### 4a. Implement `_functionNameArray/index.ts`

See `references/reduce-example.md` and `references/map-example.md` for complete examples.

Run tests after implementing.

#### 4b. Implement `_functionNameToResult/index.ts`

See `references/reduce-example.md` and `references/map-example.md` for complete examples.

Run tests after implementing.

#### 4c. Implement `_functionNameToValidation/index.ts`

See `references/reduce-example.md` and `references/map-example.md` for complete examples.

Run tests after implementing.

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
deno test libraries/toolsmith/src/array/functionName/index.test.ts
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
// 1. Plain array overload
function name(array: ReadonlyArray<T>): ReturnType

// 2. Result overload
function name(array: Result<E, ReadonlyArray<T>>): Result<E, ReturnType>

// 3. Validation overload
function name(array: Validation<E, ReadonlyArray<T>>): Validation<E, ReturnType>

// 4. Implementation (union of all three)
function name(
  array: ReadonlyArray<T> | Result<E, ReadonlyArray<T>> | Validation<E, ReadonlyArray<T>>
): ReturnType | Result<E, ReturnType> | Validation<E, ReturnType>
```

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
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

// Predicates
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

// Chain functions
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
```

### Import as Needed

```typescript
// Logic
import and from "../../logic/and/index.ts"

// Predicates
import isFunction from "../../predicates/isFunction/index.ts"

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
deno run --allow-read --allow-write .claude/skills/three-path-pattern/scripts/script.ts functionName ./libraries/toolsmith/src/array "Function description"
```

This creates directory structure and template files with TODO placeholders. You must implement the logic manually.

---

## Final Checklist

Before presenting code - **ALL items must be checked:**

**Testing (MANDATORY - do not present code if any test fails):**
- [ ] Tests written FIRST before implementation (TDD)
- [ ] Tests cover all three paths (plain, Result, Validation)
- [ ] Tests include error passthrough cases
- [ ] Property-based tests included
- [ ] **ALL tests pass** - `deno test` shows 0 failures
- [ ] `deno task fmt` passes - code is formatted
- [ ] `deno task lint` passes - no linting errors
- [ ] `deno task check` passes - TypeScript types valid

**Constitutional Compliance:**
- [ ] Directory structure correct (_functionNameArray, _functionNameToResult, _functionNameToValidation)
- [ ] All functions curried (one parameter each)
- [ ] Function keyword only (no arrows in implementation)
- [ ] Proper naming convention (With/And pattern)
- [ ] No classes, no mutations, no loops, no exceptions
- [ ] `ReadonlyArray<T>` everywhere for immutability
- [ ] `[EXCEPTION]` comment at top of each file

**Type Safety:**
- [ ] Three overloads in main function
- [ ] Runtime type checking routing (isArray, isOk, isSuccess)
- [ ] Error structures correct (single object for Result, array for Validation)

**DO NOT present code to the user until ALL items are checked. If updating an existing function, add tests if they don't exist.**

---

**Remember: ONE FUNCTION AT A TIME. NO SHORTCUTS. FOLLOW THE PROCESS EXACTLY. ALL TESTS MUST PASS.**
