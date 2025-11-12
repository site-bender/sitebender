# Error Structures for Three-Path Pattern

This document defines the error structures used in Result and Validation paths of three-path pattern functions.

---

## Key Difference: Result vs Validation

| Aspect | Result | Validation |
|--------|--------|------------|
| **Error Container** | Single error object | Array of error objects |
| **Constructor** | `error(singleError)` | `failure([error1, error2, ...])` |
| **Error Strategy** | Fail-fast (stop on first error) | Accumulate all errors |
| **Use Case** | Pipelines, sequential operations | Form validation, parallel checks |

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

### Pattern: `FUNCTION_SPECIFIC_ISSUE`

Examples:
- `MAP_INVALID_ARRAY`
- `MAP_INVALID_FUNCTION`
- `REDUCE_INVALID_INPUT`
- `REDUCE_INVALID_FUNCTION`
- `FILTER_INVALID_PREDICATE`
- `FILTER_INVALID_ARRAY`

### General Patterns

```
FUNCTION_INVALID_ARRAY      // When array parameter is invalid
FUNCTION_INVALID_FUNCTION   // When function parameter is invalid
FUNCTION_INVALID_PREDICATE  // When predicate parameter is invalid
FUNCTION_INVALID_INPUT      // When generic input is invalid
FUNCTION_TYPE_ERROR         // When type mismatch occurs
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

### Result Helper with Errors

```typescript
export default function _mapToResult<E, T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<U>> {
		if (isFunction(f)) {
			if (isArray(array)) {
				return ok(array.map(f))
			}

			// Error: invalid array
			return error({
				code: "MAP_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to map over",
				severity: "requirement" as const,
			} as E)
		}

		// Error: invalid function
		return error({
			code: "MAP_INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof f,
			expected: "Function",
			suggestion: "Provide a valid function to map with",
			severity: "requirement" as const,
		} as E)
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
		if (isFunction(f)) {
			if (isArray(array)) {
				return success(array.map(f))
			}

			// Error: invalid array (note the array wrapper)
			return failure([{
				code: "MAP_INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to map over",
				severity: "requirement" as const,
			} as E])
		}

		// Error: invalid function (note the array wrapper)
		return failure([{
			code: "MAP_INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof f,
			expected: "Function",
			suggestion: "Provide a valid function to map with",
			severity: "requirement" as const,
		} as E])
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
