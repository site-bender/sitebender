import isNull from "../../validation/isNull/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"

//++ Creates consistent cache keys for memoization, generating deterministic string keys from various input types with circular reference handling
type KeyOptions = {
	separator?: string
	maxDepth?: number
	includeType?: boolean
	maxLength?: number
	hash?: boolean
	transform?: (arg: unknown) => unknown
}

const memoizeKey =
	(options: KeyOptions = {}) => (...args: Array<unknown>): string => {
		const {
			separator = "|",
			maxDepth = 10,
			includeType = false,
			maxLength = 1000,
			hash = false,
			transform,
		} = options

		// Track visited objects to handle circular references
		const visited = new WeakSet()

		const processValue = (value: unknown, depth: number = 0): string => {
			// Apply transform if provided
			if (transform) {
				value = transform(value)
			}

			// Handle primitives
			if (isNull(value)) {
				return includeType ? "null:null" : "null"
			}
			if (isUndefined(value)) {
				return includeType ? "undefined:undefined" : "undefined"
			}
			if (typeof value === "boolean") {
				const str = String(value)
				return includeType ? `boolean:${str}` : str
			}
			if (typeof value === "number") {
				const str = String(value)
				return includeType ? `number:${str}` : str
			}
			if (typeof value === "string") {
				return includeType ? `string:${value}` : value
			}
			if (typeof value === "symbol") {
				const str = value.toString()
				return includeType ? `symbol:${str}` : str
			}
			if (typeof value === "bigint") {
				const str = value.toString()
				return includeType ? `bigint:${str}` : str
			}
			if (typeof value === "function") {
				return includeType ? "function:[Function]" : "[Function]"
			}

			// Check depth limit
			if (depth >= maxDepth) {
				return "[object]"
			}

			// Handle circular references
			if (visited.has(value)) {
				return "[Circular]"
			}

			// Handle Date objects
			if (value instanceof Date) {
				const str = value.getTime().toString()
				return includeType ? `date:${str}` : str
			}

			// Handle RegExp
			if (value instanceof RegExp) {
				const str = value.toString()
				return includeType ? `regexp:${str}` : str
			}

			// Handle Set
			if (value instanceof Set) {
				visited.add(value)
				const items = Array.from(value).map((v) => processValue(v, depth + 1))
				visited.delete(value)
				const str = `Set([${items.join(",")}])`
				return includeType ? `set:${str}` : str
			}

			// Handle Map
			if (value instanceof Map) {
				visited.add(value)
				const entries = Array.from(value.entries()).map(
					([k, v]) =>
						`[${processValue(k, depth + 1)},${processValue(v, depth + 1)}]`,
				)
				visited.delete(value)
				const str = `Map([${entries.join(",")}])`
				return includeType ? `map:${str}` : str
			}

			// Handle Arrays
			if (Array.isArray(value)) {
				visited.add(value)
				const items = value.map((v) => processValue(v, depth + 1))
				visited.delete(value)
				const str = `[${items.join(",")}]`
				return includeType ? `array:${str}` : str
			}

			// Handle Objects
			if (typeof value === "object") {
				visited.add(value)

				// Sort keys for consistency
				const obj = value as Record<string, unknown>
				const keys = Object.keys(obj).sort()
				const pairs = keys.map((key) => {
					const val = processValue(obj[key], depth + 1)
					return `"${key}":${val}`
				})

				visited.delete(value)
				const str = `{${pairs.join(",")}}`
				return includeType ? `object:${str}` : str
			}

			return "[unknown]"
		}

		// Process all arguments
		const keyParts = args.map((arg) => processValue(arg))
		let key = keyParts.join(separator)

		// Apply length limit and hashing if needed
		if (maxLength && key.length > maxLength) {
			if (hash) {
				// Simple hash function for consistent keys
				let hashValue = 0
				for (let i = 0; i < key.length; i++) {
					const char = key.charCodeAt(i)
					hashValue = ((hashValue << 5) - hashValue) + char
					hashValue = hashValue & hashValue // Convert to 32-bit integer
				}
				key = `hash:${Math.abs(hashValue).toString(36)}`
			} else {
				key = key.substring(0, maxLength - 3) + "..."
			}
		}

		return key
	}

//?? [EXAMPLE] makeKey(1, 2, 3) // "1|2|3"
//?? [EXAMPLE] makeKey("hello", "world") // "hello|world"
//?? [EXAMPLE] makeKey({ b: 2, a: 1 }) // '{"a":1,"b":2}'
//?? [EXAMPLE] makeKey({ a: 1, b: 2 }) // '{"a":1,"b":2}' (same)
//?? [EXAMPLE] customKey("user", 123, "profile") // "user:123:profile"
//?? [EXAMPLE] memoizeKey()(obj) // Returns key with [Circular] marker
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic key generation
 | const makeKey = memoizeKey()
 | makeKey(1, 2, 3)                    // "1|2|3"
 | makeKey("hello", "world")           // "hello|world"
 |
 | // Object keys are sorted for consistency
 | makeKey({ b: 2, a: 1 })             // '{"a":1,"b":2}'
 | makeKey({ a: 1, b: 2 })             // '{"a":1,"b":2}' (same)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Custom separator
 | const customKey = memoizeKey({ separator: ":" })
 | customKey("user", 123, "profile")  // "user:123:profile"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Function argument caching
 | function createMemoized<T extends Array<any>, R>(
 |   fn: (...args: T) => R
 | ): (...args: T) => R {
 |   const cache = new Map<string, R>()
 |   const fnKey = memoizeKey()
 |
 |   return (...args: T): R => {
 |     const key = fnKey(...args)
 |     if (cache.has(key)) return cache.get(key)!
 |     const result = fn(...args)
 |     cache.set(key, result)
 |     return result
 |   }
 | }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Circular references handled safely
 | const obj: any = { a: 1 }
 | obj.self = obj
 | memoizeKey()(obj)                   // Returns key with [Circular] marker
 | ```
 |
 | [PRO]
 | * Handles complex nested structures safely
 | * Consistent key generation for objects (sorted keys)
 | * Circular reference protection
 | * Configurable options for different use cases
 | * Works with all JavaScript types
 |
 | [CON]
 | * Performance overhead for complex objects
 | * Memory usage for visited object tracking
 | * JSON.stringify limitations for some types
 */

export default memoizeKey
