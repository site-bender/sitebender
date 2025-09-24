# EXACT Linguist API Output for Envoy

These are the **EXACT** data structures Envoy receives from Linguist. No strings, no regex - real TypeScript AST nodes and structured data.

## Example 1: Simple Pure Function

**Source Code:**

```typescript
//++ Validates an email address using regex pattern matching
export default function validateEmail(email: string): boolean {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return pattern.test(email)
}
//?? [EXAMPLE] validateEmail("test@example.com") // true
//?? [EXAMPLE] validateEmail("invalid-email") // false
//?? [GOTCHA] Does not validate against disposable email providers
```

**Linguist Output:**

```typescript
// What extractFunctions returns
{
  functions: [
    {
      node: typescript.FunctionDeclaration, // REAL TypeScript AST node
      signature: {
        name: "validateEmail",
        filePath: "/path/to/file.ts",
        parameters: [
          {
            name: "email",
            type: {
              raw: "string",
              kind: "primitive"
            },
            isOptional: false,
            isRest: false,
            defaultValue: undefined
          }
        ],
        returnType: {
          raw: "boolean", 
          kind: "primitive"
        },
        generics: [],
        isAsync: false,
        isGenerator: false,
        isCurried: false,
        isPure: true,        // No side effects
        isExported: true,    // Has export keyword
        isDefault: true      // Has default keyword
      },
      metadata: {
        hasThrowStatements: false,
        hasAwaitExpressions: false,
        hasGlobalAccess: false,
        cyclomaticComplexity: 1,
        hasReturnStatements: true
      }
    }
  ],
  comments: [
    {
      kind: "line",
      text: "Validates an email address using regex pattern matching",
      fullText: "//++ Validates an email address using regex pattern matching", 
      type: "description",
      position: "before"
    },
    {
      kind: "line",
      text: "[EXAMPLE] validateEmail(\"test@example.com\") // true",
      fullText: "//?? [EXAMPLE] validateEmail(\"test@example.com\") // true",
      type: "example", 
      position: "after"
    },
    {
      kind: "line",
      text: "[EXAMPLE] validateEmail(\"invalid-email\") // false",
      fullText: "//?? [EXAMPLE] validateEmail(\"invalid-email\") // false",
      type: "example",
      position: "after"
    },
    {
      kind: "line",
      text: "[GOTCHA] Does not validate against disposable email providers",
      fullText: "//?? [GOTCHA] Does not validate against disposable email providers",
      type: "gotcha",
      position: "after"
    }
  ]
}
```

## Example 2: Async Function with Error Handling

**Source Code:**

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

**Linguist Output:**

```typescript
{
  node: typescript.FunctionDeclaration, // REAL TypeScript AST node
  signature: {
    name: "fetchUser",
    filePath: "/path/to/file.ts", 
    parameters: [
      {
        name: "id",
        type: {
          raw: "number",
          kind: "primitive"
        },
        isOptional: false,
        isRest: false,
        defaultValue: undefined
      }
    ],
    returnType: {
      raw: "Promise<User | null>",
      kind: "object"     // Promise is an object type
    },
    generics: [],
    isAsync: true,       // Has async keyword
    isGenerator: false,
    isCurried: false,
    isPure: false,       // Has console.error (side effect)
    isExported: true,
    isDefault: false
  },
  metadata: {
    hasThrowStatements: true,    // throw new Error
    hasAwaitExpressions: true,   // await fetch, await response.json  
    hasGlobalAccess: true,       // console.error, fetch
    cyclomaticComplexity: 3,     // if + try/catch
    hasReturnStatements: true
  }
}
```

## Example 3: Generic Curried Function

**Source Code:**

```typescript
//++ Creates a curried function for adding numbers
function createAdder<T extends number>(base: T): (value: T) => T {
	return function addToBase(value: T): T {
		return (base + value) as T
	}
}
//?? [EXAMPLE] const add5 = createAdder(5)
//?? [EXAMPLE] add5(10) // 15
```

**Linguist Output:**

```typescript
{
  node: typescript.FunctionDeclaration, // REAL TypeScript AST node
  signature: {
    name: "createAdder",
    filePath: "/path/to/file.ts",
    parameters: [
      {
        name: "base", 
        type: {
          raw: "T",
          kind: "generic"
        },
        isOptional: false,
        isRest: false,
        defaultValue: undefined
      }
    ],
    returnType: {
      raw: "(value: T) => T",
      kind: "function"     // Returns a function
    },
    generics: [
      {
        name: "T",
        constraint: "number",  // T extends number
        default: undefined
      }
    ],
    isAsync: false,
    isGenerator: false,
    isCurried: true,        // Returns a function
    isPure: true,           // No side effects
    isExported: false,
    isDefault: false
  },
  metadata: {
    hasThrowStatements: false,
    hasAwaitExpressions: false,
    hasGlobalAccess: false,
    cyclomaticComplexity: 1,
    hasReturnStatements: true
  }
}
```

## Example 4: Generator Function

**Source Code:**

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

**Linguist Output:**

```typescript
{
  node: typescript.FunctionDeclaration, // REAL TypeScript AST node
  signature: {
    name: "generateIds",
    filePath: "/path/to/file.ts",
    parameters: [],        // No parameters
    returnType: {
      raw: "Generator<number, void, unknown>",
      kind: "object"      // Generator is an object type
    },
    generics: [],
    isAsync: false,
    isGenerator: true,     // Has * (asterisk token)
    isCurried: false,
    isPure: false,         // Stateful (id++)
    isExported: true,
    isDefault: false
  },
  metadata: {
    hasThrowStatements: false,
    hasAwaitExpressions: false, 
    hasGlobalAccess: false,
    cyclomaticComplexity: 2,    // while loop
    hasReturnStatements: false  // Uses yield, not return
  }
}
```

## Example 5: Complex Arrow Function with Generics

**Source Code:**

```typescript
//++ Processes array of items with transformation
const processItems = async <T, U>(
	items: readonly T[],
	transform: (item: T) => Promise<U>,
): Promise<U[]> => {
	const results: U[] = []
	for (const item of items) {
		try {
			const transformed = await transform(item)
			results.push(transformed)
		} catch (error) {
			// Skip failed transformations
			continue
		}
	}
	return results
}
//?? [EXAMPLE] const numbers = await processItems([1,2,3], async x => x * 2)
```

**Linguist Output:**

```typescript
{
  node: typescript.ArrowFunction, // REAL TypeScript AST node (arrow function)
  signature: {
    name: "processItems",
    filePath: "/path/to/file.ts",
    parameters: [
      {
        name: "items",
        type: {
          raw: "readonly T[]",
          kind: "array"
        },
        isOptional: false,
        isRest: false,
        defaultValue: undefined
      },
      {
        name: "transform", 
        type: {
          raw: "(item: T) => Promise<U>",
          kind: "function"
        },
        isOptional: false,
        isRest: false,
        defaultValue: undefined
      }
    ],
    returnType: {
      raw: "Promise<U[]>",
      kind: "object"        // Promise is object type
    },
    generics: [
      {
        name: "T",
        constraint: undefined,
        default: undefined
      },
      {
        name: "U", 
        constraint: undefined,
        default: undefined
      }
    ],
    isAsync: true,         // async arrow function
    isGenerator: false,
    isCurried: false,
    isPure: false,         // Mutates results array
    isExported: false,     // const, not exported
    isDefault: false
  },
  metadata: {
    hasThrowStatements: false,
    hasAwaitExpressions: true,    // await transform(item)
    hasGlobalAccess: false,
    cyclomaticComplexity: 3,      // for loop + try/catch
    hasReturnStatements: true
  }
}
```

## Example 6: Type Guard Function

**Source Code:**

```typescript
//++ Simple utility for checking if value exists
const isDefined = <T>(value: T | undefined | null): value is T => {
	return value !== undefined && value !== null
}
//?? [EXAMPLE] isDefined(null) // false
//?? [EXAMPLE] isDefined("hello") // true
```

**Linguist Output:**

```typescript
{
  node: typescript.ArrowFunction, // REAL TypeScript AST node
  signature: {
    name: "isDefined",
    filePath: "/path/to/file.ts",
    parameters: [
      {
        name: "value",
        type: {
          raw: "T | undefined | null", 
          kind: "union"       // Union type
        },
        isOptional: false,
        isRest: false,
        defaultValue: undefined
      }
    ],
    returnType: {
      raw: "value is T",    // Type predicate
      kind: "primitive"     // Resolves to boolean
    },
    generics: [
      {
        name: "T",
        constraint: undefined,
        default: undefined
      }
    ],
    isAsync: false,
    isGenerator: false,
    isCurried: false,
    isPure: true,          // No side effects
    isExported: false,
    isDefault: false
  },
  metadata: {
    hasThrowStatements: false,
    hasAwaitExpressions: false,
    hasGlobalAccess: false,
    cyclomaticComplexity: 1,     // Simple boolean logic
    hasReturnStatements: true
  }
}
```

## Key Points for Envoy:

1. **REAL TypeScript Nodes**: `node` property contains actual `typescript.Node` objects
2. **Structured Data**: No string parsing needed - everything is pre-parsed
3. **Rich Type Information**: `TypeInfo` objects with `raw` text and `kind` enum
4. **Pre-computed Analysis**: `metadata` provides fast-path for complexity/purity
5. **Comment Structure**: Parsed comments with types (description, example, gotcha, pro)
6. **Complete Signatures**: All function properties extracted and categorized

**Envoy should NEVER:**

- Parse strings with regex
- Re-analyze TypeScript AST
- Ignore the metadata fast-paths
- Reconstruct what Linguist already provides

**Envoy should ALWAYS:**

- Use the `node` property for TypeScript AST operations
- Use `signature` for documentation generation
- Use `metadata` for fast-path optimizations
- Use `comments` for Envoy-specific documentation features
