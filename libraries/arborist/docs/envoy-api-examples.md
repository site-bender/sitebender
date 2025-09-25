# Arborist API Output for Envoy

Exact data structures Envoy receives from Arborist using SWC-based parsing.

## Example 1: Simple Pure Function

**Source:**

```typescript
//++ Validates email address using regex pattern matching
export default function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
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
		span: { start: 73, end: 215 },
		isAsync: false,
		isGenerator: false,
		isArrow: false,
		params: [
			{
				name: "email",
				optional: false,
				typeText: "string",
				span: { start: 104, end: 117 }
			}
		],
		returnTypeText: "boolean",
		typeParams: []
	},
	comments: [
		{
			kind: "line",
			text: "Validates email address using regex pattern matching",
			fullText: "//++ Validates email address using regex pattern matching",
			start: 0,
			end: 58,
			line: 1,
			column: 1,
			nodeId: "validateEmail"
		},
		{
			kind: "line",
			text: "[EXAMPLE] validateEmail(\"test@example.com\") // true",
			fullText: "//?? [EXAMPLE] validateEmail(\"test@example.com\") // true",
			start: 217,
			end: 274,
			line: 7,
			column: 1
		},
		{
			kind: "line",
			text: "[EXAMPLE] validateEmail(\"invalid-email\") // false",
			fullText: "//?? [EXAMPLE] validateEmail(\"invalid-email\") // false",
			start: 276,
			end: 331,
			line: 8,
			column: 1
		},
		{
			kind: "line",
			text: "[GOTCHA] Does not validate against disposable email providers",
			fullText: "//?? [GOTCHA] Does not validate against disposable email providers",
			start: 333,
			end: 400,
			line: 9,
			column: 1
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
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);

    return null;
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
		span: { start: 52, end: 334 },
		isAsync: true,
		isGenerator: false,
		isArrow: false,
		params: [
			{
				name: "id",
				optional: false,
				typeText: "number",
				span: { start: 84, end: 94 }
			}
		],
		returnTypeText: "Promise<User | null>",
		typeParams: []
	},
	branches: [
		{
			kind: "if",
			span: { start: 183, end: 234 },
			consequent: { start: 203, end: 234 }
		},
		{
			kind: "try",
			span: { start: 122, end: 332 }
		}
	]
}
```

## Example 3: Generic Curried Function

**Source:**

```typescript
//++ Creates curried function for adding numbers
export function createAdder<T extends number>(base: T): (value: T) => T {
  return function addToBase(value: T): T {
    return (base + value) as T;
  };
}

//?? [EXAMPLE] const add5 = createAdder(5)
//?? [EXAMPLE] add5(10) // 15
```

**Arborist Output:**

```typescript
{
	function: {
		name: "createAdder",
		span: { start: 49, end: 179 },
		isAsync: false,
		isGenerator: false,
		isArrow: false,
		params: [
			{
				name: "base",
				optional: false,
				typeText: "T",
				span: { start: 96, end: 103 }
			}
		],
		returnTypeText: "(value: T) => T",
		typeParams: [
			{
				name: "T",
				constraintText: "number",
				defaultText: undefined
			}
		]
	}
}
```

## Example 4: Generator Function

**Source:**

```typescript
//++ Generates sequential IDs starting from 1
export function* generateIds(): Generator<number, void, unknown> {
  let id = 1;

  while (true) {
    yield id++;
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
		span: { start: 46, end: 149 },
		isAsync: false,
		isGenerator: true,
		isArrow: false,
		params: [],
		returnTypeText: "Generator<number, void, unknown>",
		typeParams: []
	},
	branches: [
		{
			kind: "logical",
			span: { start: 131, end: 135 }
		}
	]
}
```

## Example 5: Arrow Function with Generics

**Source:**

```typescript
//++ Processes array items with transformation
export const processItems = async <T, U>(
  items: ReadonlyArray<T>,
  transform: (item: T) => Promise<U>,
): Promise<Array<U>> => {
  const results: Array<U> = [];

  for (const item of items) {
    try {
      const transformed = await transform(item);
      results.push(transformed);
    } catch (error) {
      continue;
    }
  }

  return results;
};

//?? [EXAMPLE] const numbers = await processItems([1, 2, 3], async (x) => x * 2)
```

**Arborist Output:**

```typescript
{
	function: {
		name: "processItems",
		span: { start: 47, end: 356 },
		isAsync: true,
		isGenerator: false,
		isArrow: true,
		params: [
			{
				name: "items",
				optional: false,
				typeText: "ReadonlyArray<T>",
				span: { start: 90, end: 113 }
			},
			{
				name: "transform",
				optional: false,
				typeText: "(item: T) => Promise<U>",
				span: { start: 116, end: 150 }
			}
		],
		returnTypeText: "Promise<Array<U>>",
		typeParams: [
			{
				name: "T",
				constraintText: undefined,
				defaultText: undefined
			},
			{
				name: "U",
				constraintText: undefined,
				defaultText: undefined
			}
		]
	},
	branches: [
		{
			kind: "try",
			span: { start: 236, end: 324 }
		}
	]
}
```

## Example 6: Type Guard Function

**Source:**

```typescript
//++ Checks if value is defined (not null or undefined)
export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

//?? [EXAMPLE] isDefined(null) // false
//?? [EXAMPLE] isDefined("hello") // true
```

**Arborist Output:**

```typescript
{
	function: {
		name: "isDefined",
		span: { start: 56, end: 177 },
		isAsync: false,
		isGenerator: false,
		isArrow: true,
		params: [
			{
				name: "value",
				optional: false,
				typeText: "T | undefined | null",
				span: { start: 82, end: 110 }
			}
		],
		returnTypeText: "value is T",
		typeParams: [
			{
				name: "T",
				constraintText: undefined,
				defaultText: undefined
			}
		]
	},
	branches: [
		{
			kind: "logical",
			span: { start: 135, end: 175 }
		}
	]
}
```

## Key Points for Envoy

1. **Syntax-Level Data** - All type information is textual, not semantic
2. **Precise Spans** - Exact character positions for all elements
3. **Comment Structure** - Raw comments with positions, no interpretation
4. **Branch Analysis** - Conditional paths for complexity metrics
5. **No TypeScript AST** - Pure SWC structures via deno_ast

**Envoy receives:**

- Function metadata (name, flags, spans)
- Parameter and return type text
- Generic type parameter text
- Raw comments with positions
- Branch information for complexity

**Envoy does NOT receive:**

- TypeScript compiler nodes
- Semantic type information
- Inferred types
- Symbol tables
- Cross-file references
