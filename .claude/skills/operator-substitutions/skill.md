---
name: operator-substitutions
description: Using Toolsmith functions instead of raw JavaScript operators and methods (&&, ||, !, .length, ===, etc.). Use when writing conditionals, comparisons, logic operations, or working with collections. Prefer Toolsmith functions to reduce cognitive load and improve readability.
---

# Operator Substitutions: Toolsmith Idioms

## Core Principle

**Make code read like plain English to reduce cognitive load.**

When you read `array.length > 0`, your brain translates: "the array's length property is greater than zero, so... oh, it's checking if the array isn't empty."

When you read `isNotEmpty(array)`, no translation needed. This adds up across thousands of lines of code.

## When to Use This Skill

Use this skill when:
- Writing conditionals (`if`, ternaries)
- Performing logical operations
- Checking equality or comparison
- Working with arrays, strings, objects, maps, or sets
- Any time you're tempted to use raw JavaScript operators

## Categories

All examples are located in `examples/` directory. Examine these files for complete, correct implementations in real contexts.

### Category 1: Logical Operations

**Import from:** `@sitebender/toolsmith/logic/`

#### NOT operator

**Never use:** `!value`
**Always use:** `not(value)`

**Why:** Reads as "not value" in plain English; also, the `!` operator is difficult to see
**Exception:** NONE - the `not` function is the ONLY permitted use of `!` operator
**Import:** `import not from "@sitebender/toolsmith/logic/not/index.ts"`

**Example context:**
```typescript
// Checking if value is not null
if (not(isNull(value))) {
	// use value
}
```

#### AND operator

**Avoid when possible:** `x && y`
**Prefer:** `and(x)(y)`

**Why:** Reads as "x and y", returns guaranteed boolean
**Exception:** When TypeScript type narrowing is required, `&&` is acceptable
**Import:** `import and from "@sitebender/toolsmith/logic/and/index.ts"`

**Note:** Use `allPass` for combining predicates, not `and`

#### OR operator

**Avoid when possible:** `x || y`
**Prefer:** `or(x)(y)`

**Why:** Reads as "x or y", returns guaranteed boolean
**Exception:** When TypeScript type narrowing is required, `||` is acceptable
**Import:** `import or from "@sitebender/toolsmith/logic/or/index.ts"`

**Note:** Use `anyPass` for combining predicates, not `or`

### Category 2: Equality and Comparison

**Import from:** `@sitebender/toolsmith/comparison/`

#### Strict Equality

**Never use:** `x === y`
**Always use:** `isEqual(x)(y)` or `is(x)(y)`

**Why:** Reads as "x is equal to y" or "x is y"
**Import:**
- `import isEqual from "@sitebender/toolsmith/comparison/isEqual/index.ts"`
- `import is from "@sitebender/toolsmith/comparison/is/index.ts"` (uses Object.is)

**Difference:** `isEqual` uses deep equality, `is` uses SameValue (Object.is)

#### Strict Inequality

**Never use:** `x !== y`
**Always use:** `isNotEqual(x)(y)` or `isUnequal(x)(y)`

**Why:** Reads as "x is not equal to y"
**Import:** `import isUnequal from "@sitebender/toolsmith/comparison/isUnequal/index.ts"`

### Category 3: Array Operations

**Import from:** `@sitebender/toolsmith/array/`

#### Check if array is empty

**Never use:** `array.length === 0`
**Always use:** `isEmpty(array)`

**Why:** "is empty" reads immediately, no mental translation
**Import:** `import isEmpty from "@sitebender/toolsmith/array/isEmpty/index.ts"`

#### Check if array is not empty

**Never use:** `array.length > 0` or `array.length !== 0`
**Always use:** `isNotEmpty(array)`

**Why:** "is not empty" reads immediately
**Import:** `import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"`

**Example context:**
```typescript
// Guard clause checking if array has items
if (not(isNotEmpty(items))) {
	return error({ code: "NO_ITEMS" })
}

// Process items...
```

#### Get array length

**Avoid when possible:** `array.length`
**Prefer:** `length(array)` (returns Result monad)

**Why:** Validates input, returns error for non-arrays
**Exception:** Internal utilities where type is guaranteed can use `.length` with exception comment
**Import:** `import length from "@sitebender/toolsmith/array/length/index.ts"`

### Category 4: String Operations

**Import from:** `@sitebender/toolsmith/string/`

#### Check if string is empty

**Never use:** `str.length === 0` or `str === ""`
**Always use:** `isEmpty(str)`

**Why:** "is empty" is self-documenting
**Import:** `import isEmpty from "@sitebender/toolsmith/string/isEmpty/index.ts"`

#### Check if string is not empty

**Never use:** `str.length > 0` or `str !== ""`
**Always use:** `isNotEmpty(str)`

**Why:** "is not empty" is self-documenting
**Import:** `import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"`

**Example context:**
```typescript
// Validating required field
if (isEmpty(username)) {
	return error({ code: "USERNAME_REQUIRED" })
}
```

### Category 5: Object Operations

**Import from:** `@sitebender/toolsmith/object/`

#### Check if object is empty

**Never use:** `Object.keys(obj).length === 0`
**Always use:** `isEmpty(obj)`

**Why:** Abstracts implementation detail, reads clearly
**Import:** `import isEmpty from "@sitebender/toolsmith/object/isEmpty/index.ts"`

#### Check if object is not empty

**Never use:** `Object.keys(obj).length > 0`
**Always use:** `isNotEmpty(obj)`

**Why:** Abstracts implementation detail, reads clearly
**Import:** `import isNotEmpty from "@sitebender/toolsmith/object/isNotEmpty/index.ts"`

### Category 6: Map Operations

**Import from:** `@sitebender/toolsmith/map/`

#### Check if map is empty

**Never use:** `map.size === 0`
**Always use:** `isEmpty(map)`

**Why:** Consistent API across all collection types
**Import:** `import isEmpty from "@sitebender/toolsmith/map/isEmpty/index.ts"`

#### Check if map is not empty

**Never use:** `map.size > 0`
**Always use:** `isNotEmpty(map)`

**Why:** Consistent API across all collection types
**Import:** `import isNotEmpty from "@sitebender/toolsmith/map/isNotEmpty/index.ts"`

### Category 7: Set Operations

**Import from:** `@sitebender/toolsmith/set/`

#### Check if set is empty

**Never use:** `set.size === 0`
**Always use:** `isEmpty(set)`

**Why:** Consistent API across all collection types
**Import:** `import isEmpty from "@sitebender/toolsmith/set/isEmpty/index.ts"`

#### Check if set is not empty

**Never use:** `set.size > 0`
**Always use:** `isNotEmpty(set)`

**Why:** Consistent API across all collection types
**Import:** `import isNotEmpty from "@sitebender/toolsmith/set/isNotEmpty/index.ts"`

## Common Patterns

### Guard Clauses

**Pattern:** Early returns for invalid states

```typescript
// Check for empty input
if (isEmpty(items)) {
	return error({ code: "EMPTY_INPUT" })
}

// Check for missing value
if (isNull(value)) {
	return error({ code: "VALUE_REQUIRED" })
}

// Inverted check
if (not(isValid(data))) {
	return error({ code: "INVALID_DATA" })
}
```

### Conditionals

**Pattern:** Using predicates in if statements

```typescript
// Check collection state
if (isNotEmpty(errors)) {
	return validation({ errors })
}

// Multiple conditions with predicates
if (isNotEmpty(name) && isEmail(email)) {
	// process valid input
}
```

### Combining Predicates

**Pattern:** Use allPass/anyPass instead of && / ||

```typescript
import allPass from "@sitebender/toolsmith/validation/allPass/index.ts"
import anyPass from "@sitebender/toolsmith/validation/anyPass/index.ts"

// All predicates must pass
const isValidUser = allPass([
	isNotEmpty,
	hasValidEmail,
	hasStrongPassword,
])

if (isValidUser(userData)) {
	// all checks passed
}

// Any predicate must pass
const isNullOrUndefined = anyPass([isNull, isUndefined])

if (isNullOrUndefined(value)) {
	// value is null or undefined
}
```

## Benefits Summary

1. **Reduced Cognitive Load** - Code reads like plain English
2. **Consistency** - Same API across all collection types
3. **Type Safety** - Functions validate input and provide proper type guards
4. **Composability** - Functions can be partially applied and composed
5. **Self-Documentation** - Intent is clear without comments
6. **Error Prevention** - Functions handle edge cases defensively

## Examples Directory

Examine all examples in `examples/` directory for complete, correct implementations showing these patterns in real contexts. Each example demonstrates proper usage following all constitutional rules.
