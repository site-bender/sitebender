# Arborist API Output for Envoy

Exact data structures Envoy receives from Arborist using SWC WASM parsing.

## Example 1: Simple Pure Function

**Source:**

```typescript
//++ Validates email address using regex pattern matching
export default function validateEmail(email: string): boolean {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	return pattern.test(email)
}

//?? [EXAMPLE] validateEmail("test@example.com") // true
//?? [EXAMPLE] validateEmail("invalid-email") // false
//?? [GOTCHA] Does not validate against disposable email providers
```

**Arborist Output:**

```typescript
{
	function: {
		name: "validateEmail",
		position: { line: 2, column: 0 },
		span: { start: 73, end: 215 },
		parameters: [
			{
				name: "email",
				type: "string",
				optional: false,
				defaultValue: undefined
			}
		],
		returnType: "boolean",
		typeParameters: [],
		modifiers: {
			isExported: true,
			isDefault: true,
			isAsync: false,
			isGenerator: false,
			isArrow: false
		},
		body: {
			hasReturn: true,
			hasThrow: false,
			hasAwait: false,
			hasTryCatch: false,
			hasLoops: false,
			cyclomaticComplexity: 1
		}
	},
	comments: [
		{
			text: "Validates email address using regex pattern matching",
			position: { line: 1, column: 0 },
			span: { start: 0, end: 58 },
			kind: "line",
			envoyMarker: { marker: "++" },
			associatedNode: "validateEmail"
		},
		{
			text: "[EXAMPLE] validateEmail(\"test@example.com\") // true",
			position: { line: 7, column: 0 },
			span: { start: 217, end: 274 },
			kind: "line",
			envoyMarker: { marker: "??" }
		},
		{
			text: "[EXAMPLE] validateEmail(\"invalid-email\") // false",
			position: { line: 8, column: 0 },
			span: { start: 276, end: 331 },
			kind: "line",
			envoyMarker: { marker: "??" }
		},
		{
			text: "[GOTCHA] Does not validate against disposable email providers",
			position: { line: 9, column: 0 },
			span: { start: 333, end: 400 },
			kind: "line",
			envoyMarker: { marker: "??" }
		}
	]
}
```

## Example 2: Async Function with Error Handling

**Source:**

```typescript
//++ Fetches user data from API with error handling
export async function fetchUser(id: number): Promise<User | null> {
	try {
		const response = await fetch(`/api/users/${id}`)

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error("Failed to fetch user:", error)

		return null
	}
}

//?? [EXAMPLE] const user = await fetchUser(123)
//?? [PRO] Returns null on error instead of throwing
```

**Arborist Output:**

```typescript
{
	function: {
		name: "fetchUser",
		position: { line: 2, column: 0 },
		span: { start: 52, end: 334 },
		parameters: [
			{
				name: "id",
				type: "number",
				optional: false,
				defaultValue: undefined
			}
		],
		returnType: "Promise<User | null>",
		typeParameters: [],
		modifiers: {
			isExported: true,
			isDefault: false,
			isAsync: true,
			isGenerator: false,
			isArrow: false
		},
		body: {
			hasReturn: true,
			hasThrow: true,
			hasAwait: true,
			hasTryCatch: true,
			hasLoops: false,
			cyclomaticComplexity: 2
		}
	}
}
```

## Example 3: Generic Curried Function

**Source:**

```typescript
//++ Creates curried function for adding numbers
export function createAdder<T extends number>(base: T): (value: T) => T {
	return function addToBase(value: T): T {
		return (base + value) as T
	}
}

//?? [EXAMPLE] const add5 = createAdder(5)
//?? [EXAMPLE] add5(10) // 15
```

**Arborist Output:**

```typescript
{
	function: {
		name: "createAdder",
		position: { line: 2, column: 0 },
		span: { start: 49, end: 179 },
		parameters: [
			{
				name: "base",
				type: "T",
				optional: false,
				defaultValue: undefined
			}
		],
		returnType: "(value: T) => T",
		typeParameters: [
			{
				name: "T",
				constraint: "number",
				default: undefined
			}
		],
		modifiers: {
			isExported: true,
			isDefault: false,
			isAsync: false,
			isGenerator: false,
			isArrow: false
		},
		body: {
			hasReturn: true,
			hasThrow: false,
			hasAwait: false,
			hasTryCatch: false,
			hasLoops: false,
			cyclomaticComplexity: 1
		}
	}
}
```

## Example 4: Generator Function

**Source:**

```typescript
//++ Generates sequential IDs starting from 1
export function* generateIds(): Generator<number, void, unknown> {
	let id = 1

	while (true) {
		yield id++
	}
}

//?? [EXAMPLE] const idGen = generateIds()
//?? [EXAMPLE] idGen.next().value // 1
```

**Arborist Output:**

```typescript
{
	function: {
		name: "generateIds",
		position: { line: 2, column: 0 },
		span: { start: 46, end: 149 },
		parameters: [],
		returnType: "Generator<number, void, unknown>",
		typeParameters: [],
		modifiers: {
			isExported: true,
			isDefault: false,
			isAsync: false,
			isGenerator: true,
			isArrow: false
		},
		body: {
			hasReturn: false,
			hasThrow: false,
			hasAwait: false,
			hasTryCatch: false,
			hasLoops: true,
			cyclomaticComplexity: 2
		}
	}
}
```

## Example 5: Type Guard Function

**Source:**

```typescript
//++ Checks if value is defined (not null or undefined)
export function isDefined<T>(value: T | undefined | null): value is T {
	return value !== undefined && value !== null
}

//?? [EXAMPLE] isDefined(null) // false
//?? [EXAMPLE] isDefined("hello") // true
```

**Arborist Output:**

```typescript
{
	function: {
		name: "isDefined",
		position: { line: 2, column: 0 },
		span: { start: 56, end: 177 },
		parameters: [
			{
				name: "value",
				type: "T | undefined | null",
				optional: false,
				defaultValue: undefined
			}
		],
		returnType: "value is T",
		typeParameters: [
			{
				name: "T",
				constraint: undefined,
				default: undefined
			}
		],
		modifiers: {
			isExported: true,
			isDefault: false,
			isAsync: false,
			isGenerator: false,
			isArrow: false
		},
		body: {
			hasReturn: true,
			hasThrow: false,
			hasAwait: false,
			hasTryCatch: false,
			hasLoops: false,
			cyclomaticComplexity: 1
		}
	}
}
```

## Error Handling Example

**Parse Error:**

```typescript
const result = await parseFile("/missing/file.ts")

// Result structure
{
	_tag: "Error",
	error: {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/missing/file.ts"],
		message: "parseFile: file not found in /missing/file.ts",
		code: "NOT_FOUND",
		severity: "error",
		kind: "FileNotFound",
		file: "/missing/file.ts",
		suggestion: "Check that the file path is correct and the file exists. Run 'ls -la /missing/' to verify."
	}
}
```

**Extraction Error with Partial Success:**

```typescript
const result = await parseFile("/src/module.ts")

if (result._tag === "Ok") {
	const validation = buildParsedFile(result.value)("/src/module.ts")

	// If some extractions fail
	{
		_tag: "Failure",
		errors: [
			{
				name: "extractFunctionsError",
				operation: "extractFunctions",
				message: "extractFunctions: Unknown node type 'ClassExpression' at position 1234",
				code: "TYPE_MISMATCH",
				severity: "warning",
				kind: "UnknownNodeType",
				nodeType: "ClassExpression",
				span: { start: 1234, end: 1456 },
				suggestion: "This AST node type is not yet supported. Please file an issue with the node structure."
			}
		]
		// Note: Other extractions (comments, imports) may have succeeded
		// Check individual extraction functions for partial data
	}
}
```

## Key Points for Envoy

1. **Syntax-Level Data** - All type information is textual, not semantic
2. **Precise Spans** - Exact character positions for all elements
3. **Comment Structure** - Raw comments with positions, Envoy interprets markers
4. **Body Analysis** - Cyclomatic complexity and pattern flags for metrics
5. **Monadic Errors** - Result for parse, Validation for extraction
6. **Helpful Suggestions** - All errors include actionable guidance

**Envoy receives:**
- Function metadata (name, flags, spans, positions)
- Parameter and return type text
- Generic type parameter text
- Raw comments with Envoy markers detected
- Body analysis for complexity metrics
- Helpful error messages when issues occur

**Envoy does NOT receive:**
- SWC AST nodes
- Semantic type information
- Inferred types
- Symbol tables
- Cross-file references
