# Error Structures for Three-Path Pattern

This document defines the error structures used in Maybe, Result, and Validation paths of three-path pattern functions.

---

## Key Differences: Maybe vs Result vs Validation

| Aspect | Maybe | Result | Validation |
|--------|-------|--------|------------|
| **Error Container** | No error details | Single error object | Array of error objects |
| **Constructor** | `nothing()` | `error(singleError)` | `failure([error1, error2, ...])` |
| **Error Strategy** | No error information | Fail-fast (stop on first error) | Accumulate all errors |
| **Use Case** | Composition chains, no error details needed | Pipelines, sequential operations | Form validation, parallel checks |
| **Error Information** | None (just Nothing) | Detailed structured error | Detailed structured errors |

---

## Error Object Structure

Both Result and Validation use the same error object structure:

```typescript
{
	code: string,              // Machine-readable error code
	field: string,             // Which field/parameter caused error
	messages: ReadonlyArray<string>,  // Human-readable error messages
	received: string | typeof value,  // What was actually received
	expected: string,          // What was expected
	suggestion: string,        // How to fix the error
	severity: "requirement" | "warning" | "info"  // Error severity level
}
```

---

## Maybe Path Errors

### Constructor: `nothing()`

The Maybe path does NOT return detailed error information. It simply returns `nothing()` to indicate failure.

```typescript
import nothing from "../../../monads/maybe/nothing/index.ts"

// Any error condition returns nothing()
return nothing()
```

### When to Use Maybe

Use the Maybe path when:
- You don't need detailed error information
- You're composing operations where value might not exist
- You want lightweight error handling
- Performance is critical (no error object construction)

### Example: Invalid Function

```typescript
try {
	// Happy path: valid function
	if (isFunction(fn)) {
		if (isArray(array)) {
			return just(array.map(fn))
		}
	}

	// Any validation failure - no details needed
	return nothing()
} catch (err) {
	// Exception caught - no details needed
	return nothing()
}
```

**Note:** Maybe path is appropriate when you simply need to know "did this work?" without caring about why it failed.

---

## Result Path Errors

### Constructor: `error(singleErrorObject)`

```typescript
import error from "../../../monads/result/error/index.ts"

return error({
	code: "FUNCTION_SPECIFIC_CODE",
	field: "fieldName",
	messages: ["Human-readable error message"],
	received: typeof value,
	expected: "ExpectedType",
	suggestion: "Provide a valid input",
	severity: "requirement" as const,
} as E)
```

### Complete Example: Invalid Array

```typescript
return error({
	code: "MAP_INVALID_ARRAY",
	field: "array",
	messages: ["Expected array but received invalid input"],
	received: typeof array,
	expected: "Array",
	suggestion: "Provide a valid array to map over",
	severity: "requirement" as const,
} as E)
```

### Complete Example: Invalid Function

```typescript
return error({
	code: "REDUCE_INVALID_FUNCTION",
	field: "function",
	messages: ["Expected function but received invalid input"],
	received: typeof fn,
	expected: "Function",
	suggestion: "Provide a valid function to reduce with",
	severity: "requirement" as const,
} as E)
```

---

## Validation Path Errors

### Constructor: `failure([errorObject1, errorObject2, ...])`

```typescript
import failure from "../../../monads/validation/failure/index.ts"

return failure([
	{
		code: "FUNCTION_SPECIFIC_CODE",
		field: "fieldName",
		messages: ["Human-readable error message"],
		received: typeof value,
		expected: "ExpectedType",
		suggestion: "Provide a valid input",
		severity: "requirement" as const,
	} as E,
])
```

### Complete Example: Invalid Array

```typescript
return failure([{
	code: "MAP_INVALID_ARRAY",
	field: "array",
	messages: ["Expected array but received invalid input"],
	received: typeof array,
	expected: "Array",
	suggestion: "Provide a valid array to map over",
	severity: "requirement" as const,
} as E])
```

### Complete Example: Invalid Function

```typescript
return failure([{
	code: "REDUCE_INVALID_FUNCTION",
	field: "function",
	messages: ["Expected function but received invalid input"],
	received: typeof fn,
	expected: "Function",
	suggestion: "Provide a valid function to reduce with",
	severity: "requirement" as const,
} as E])
```

### Multiple Errors Example

```typescript
return failure([
	{
		code: "INVALID_FUNCTION",
		field: "function",
		messages: ["Function parameter must be a function"],
		received: typeof fn,
		expected: "Function",
		suggestion: "Provide a valid function",
		severity: "requirement" as const,
	} as E,
	{
		code: "INVALID_ARRAY",
		field: "array",
		messages: ["Array parameter must be an array"],
		received: typeof array,
		expected: "Array",
		suggestion: "Provide a valid array",
		severity: "requirement" as const,
	} as E,
])
```

---

## Error Code Naming Conventions

### Pattern: `FUNCTION_SPECIFIC_ISSUE` or Generic Codes

Examples:
- `INVALID_ARRAY`
- `INVALID_FUNCTION`
- `INVALID_PREDICATE`
- `INVALID_INPUT`
- `FUNCTION_THREW`

### General Patterns

```
INVALID_ARRAY      // When array parameter is invalid
INVALID_FUNCTION   // When function parameter is invalid
INVALID_PREDICATE  // When predicate parameter is invalid
INVALID_INPUT      // When generic input is invalid
FUNCTION_THREW     // When user-provided function throws exception
TYPE_ERROR         // When type mismatch occurs
```

### Exception Handling Code: `FUNCTION_THREW`

For Category 2 functions (those accepting user-provided functions), use `FUNCTION_THREW` when the user function throws an exception:

```typescript
} catch (err) {
	// Convert exception to Error
	return error({
		code: "FUNCTION_THREW",
		field: "function",
		messages: ["Function threw an exception during operation"],
		received: String(err),
		expected: "Function that does not throw",
		suggestion: "Ensure the function handles all edge cases without throwing",
		severity: "requirement" as const,
	} as E)
}
```

---

## Field Names

Use the actual parameter name from the function signature:

```typescript
// For function parameter
field: "function"

// For array parameter
field: "array"

// For predicate parameter
field: "predicate"

// For initial value parameter
field: "initialValue"
```

---

## Messages Array

Provide clear, actionable error messages:

### Good Messages

```typescript
messages: ["Expected array but received invalid input"]
messages: ["Expected function but received invalid input"]
messages: ["Array must not be empty"]
messages: ["Function must return a boolean value"]
```

### Avoid Vague Messages

```typescript
// ❌ Too vague
messages: ["Invalid input"]
messages: ["Error occurred"]

// ✅ Specific and clear
messages: ["Expected array but received invalid input"]
```

---

## Received Field

Use `typeof` to get the actual type received:

```typescript
received: typeof array      // "object", "undefined", "string", etc.
received: typeof fn         // "function", "string", "undefined", etc.
received: typeof value      // Any JavaScript type
```

For specific values:

```typescript
received: String(value)     // Convert to string representation
received: JSON.stringify(value)  // For objects/arrays
```

---

## Expected Field

State what type or value was expected:

```typescript
expected: "Array"
expected: "Function"
expected: "Boolean"
expected: "Number"
expected: "String"
expected: "Non-empty array"
expected: "Positive number"
```

---

## Suggestion Field

Provide actionable guidance on how to fix the error:

```typescript
suggestion: "Provide a valid array to map over"
suggestion: "Provide a valid function to reduce with"
suggestion: "Ensure the array is not empty"
suggestion: "Provide a function that returns a boolean"
suggestion: "Check the input type and try again"
```

---

## Severity Levels

### "requirement" (Most Common)

For errors that prevent the function from working:

```typescript
severity: "requirement" as const
```

Use for:
- Invalid types
- Missing required parameters
- Out-of-bounds values

### "warning"

For issues that don't prevent execution but may cause problems:

```typescript
severity: "warning" as const
```

Use for:
- Deprecated usage
- Performance warnings
- Potential edge cases

### "info"

For informational messages:

```typescript
severity: "info" as const
```

Use for:
- Debugging information
- Usage tips
- Non-critical notices

---

## Type Assertion: `as E`

Always cast the error object to the generic error type `E`:

```typescript
return error({
	code: "MAP_INVALID_ARRAY",
	field: "array",
	messages: ["Expected array but received invalid input"],
	received: typeof array,
	expected: "Array",
	suggestion: "Provide a valid array to map over",
	severity: "requirement" as const,
} as E)  // ← Type assertion required
```

This allows the function to work with any error type that extends the base structure.

---

## Complete Helper Function Examples

### Maybe Helper with Errors

```typescript
export default function _mapToMaybe<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToMaybeWithFunction(
		array: ReadonlyArray<T>,
	): Maybe<ReadonlyArray<U>> {
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 */
		try {
			// Happy path: valid function and array
			if (isFunction(f)) {
				if (isArray(array)) {
					return just(array.map(f))
				}
			}

			// Any validation failure - no details
			return nothing()
		} catch (err) {
			// Exception - no details
			return nothing()
		}
	}
}
```

### Result Helper with Errors

```typescript
export default function _mapToResult<E, T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<U>> {
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 */
		try {
			// Happy path: valid function and array
			if (isFunction(f)) {
				if (isArray(array)) {
					return ok(array.map(f))
				}

				// Sad path: invalid array
				return error({
					code: "INVALID_ARRAY",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to map over",
					severity: "requirement" as const,
				} as E)
			}

			// Sad path: invalid function
			return error({
				code: "INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof f,
				expected: "Function",
				suggestion: "Provide a valid function to map with",
				severity: "requirement" as const,
			} as E)
		} catch (err) {
			// Exception thrown
			return error({
				code: "FUNCTION_THREW",
				field: "function",
				messages: ["Function threw an exception during mapping"],
				received: String(err),
				expected: "Function that does not throw",
				suggestion: "Ensure the function handles all edge cases without throwing",
				severity: "requirement" as const,
			} as E)
		}
	}
}
```

### Validation Helper with Errors

```typescript
export default function _mapToValidation<E, T, U>(
	f: (arg: T, index?: number) => U,
) {
	return function _mapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<U>> {
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 */
		try {
			// Happy path: valid function and array
			if (isFunction(f)) {
				if (isArray(array)) {
					return success(array.map(f))
				}

				// Sad path: invalid array (note the array wrapper)
				return failure([{
					code: "INVALID_ARRAY",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to map over",
					severity: "requirement" as const,
				} as E])
			}

			// Sad path: invalid function (note the array wrapper)
			return failure([{
				code: "INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof f,
				expected: "Function",
				suggestion: "Provide a valid function to map with",
				severity: "requirement" as const,
			} as E])
		} catch (err) {
			// Exception thrown (note the array wrapper)
			return failure([{
				code: "FUNCTION_THREW",
				field: "function",
				messages: ["Function threw an exception during mapping"],
				received: String(err),
				expected: "Function that does not throw",
				suggestion: "Ensure the function handles all edge cases without throwing",
				severity: "requirement" as const,
			} as E])
		}
	}
}
```

---

## Testing Errors

### Testing Result Errors

```typescript
await t.step(
	"returns error for invalid array",
	function returnsErrorForInvalidArray() {
		function double(n: number): number {
			return n * 2
		}
		const result = map(double)("invalid" as unknown as ReadonlyArray<number>)

		assert(isError(result))
		assertEquals(result.error.code, "MAP_INVALID_ARRAY")
	},
)
```

### Testing Validation Errors

```typescript
await t.step(
	"returns failure for invalid array",
	function returnsFailureForInvalidArray() {
		function double(n: number): number {
			return n * 2
		}
		const result = map(double)(success("invalid" as unknown as ReadonlyArray<number>))

		assert(isFailure(result))
		assertEquals(result.errors[0].code, "MAP_INVALID_ARRAY")
	},
)
```

---

## Summary Checklist

- [ ] Result uses `error(singleObject)`, Validation uses `failure([object])`
- [ ] Error object has all required fields: code, field, messages, received, expected, suggestion, severity
- [ ] Error codes follow `FUNCTION_SPECIFIC_ISSUE` naming pattern
- [ ] Field names match actual parameter names
- [ ] Messages are clear and actionable
- [ ] `received` uses `typeof` for types
- [ ] `expected` states what was expected
- [ ] `suggestion` provides actionable guidance
- [ ] Severity is `"requirement" as const` for most errors
- [ ] Type assertion `as E` is present
- [ ] Validation errors are wrapped in array `[{ ... }]`
