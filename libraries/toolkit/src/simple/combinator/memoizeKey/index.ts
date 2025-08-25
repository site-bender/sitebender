/**
 * Creates consistent cache keys for memoization
 *
 * Generates deterministic string keys from various input types for use in
 * memoization and caching. Handles primitives, objects, arrays, dates, and
 * complex nested structures. Sorts object keys for consistency and handles
 * circular references safely. Optimized for cache key generation.
 *
 * @curried
 * @param options - Key generation configuration
 * @param args - Arguments to create key from
 * @returns Deterministic cache key string
 * @example
 * ```typescript
 * // Basic key generation
 * const makeKey = memoizeKey()
 *
 * makeKey(1, 2, 3)                        // "1|2|3"
 * makeKey("hello", "world")               // "hello|world"
 * makeKey(true, false, null)             // "true|false|null"
 * makeKey()                               // ""
 *
 * // Object key generation (sorted keys)
 * const objectKey = memoizeKey()
 *
 * objectKey({ b: 2, a: 1 })               // '{"a":1,"b":2}'
 * objectKey({ a: 1, b: 2 })               // '{"a":1,"b":2}' (same)
 * objectKey([1, 2, 3])                    // "[1,2,3]"
 *
 * // Custom separator
 * const customKey = memoizeKey({ separator: ":" })
 *
 * customKey("user", 123, "profile")      // "user:123:profile"
 * customKey("api", "v2", "users")         // "api:v2:users"
 *
 * // Maximum depth for nested objects
 * const shallowKey = memoizeKey({ maxDepth: 1 })
 *
 * shallowKey({
 *   a: { b: { c: 1 } },
 *   x: 10
 * })
 * // '{"a":"[object]","x":10}'
 *
 * // Include types in key
 * const typedKey = memoizeKey({ includeType: true })
 *
 * typedKey(123, "123", true)
 * // "number:123|string:123|boolean:true"
 *
 * // Hash long keys
 * const hashedKey = memoizeKey({
 *   maxLength: 50,
 *   hash: true
 * })
 *
 * const longString = "a".repeat(100)
 * hashedKey(longString)
 * // Returns hashed version if over 50 chars
 *
 * // Function argument caching
 * const fnKey = memoizeKey()
 *
 * function createMemoized<T extends Array<any>, R>(
 *   fn: (...args: T) => R
 * ): (...args: T) => R {
 *   const cache = new Map<string, R>()
 *
 *   return (...args: T): R => {
 *     const key = fnKey(...args)
 *
 *     if (cache.has(key)) {
 *       return cache.get(key)!
 *     }
 *
 *     const result = fn(...args)
 *     cache.set(key, result)
 *     return result
 *   }
 * }
 *
 * const memoizedMath = createMemoized(Math.pow)
 * memoizedMath(2, 10)                    // Computes: 1024
 * memoizedMath(2, 10)                    // From cache: 1024
 *
 * // Circular reference handling
 * const circularKey = memoizeKey()
 *
 * const obj: any = { a: 1 }
 * obj.self = obj
 *
 * circularKey(obj)                       // Returns key with [Circular] marker
 *
 * // Date handling
 * const dateKey = memoizeKey()
 *
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-01")
 *
 * dateKey(date1) === dateKey(date2)      // true (same time value)
 * ```
 * @pure
 * @curried
 */
type KeyOptions = {
	separator?: string
	maxDepth?: number
	includeType?: boolean
	maxLength?: number
	hash?: boolean
	transform?: (arg: any) => any
}

const memoizeKey =
	(options: KeyOptions = {}) => (...args: Array<any>): string => {
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

		const processValue = (value: any, depth: number = 0): string => {
			// Apply transform if provided
			if (transform) {
				value = transform(value)
			}

			// Handle primitives
			if (value === null) {
				return includeType ? "null:null" : "null"
			}
			if (value === undefined) {
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
				const keys = Object.keys(value).sort()
				const pairs = keys.map((key) => {
					const val = processValue(value[key], depth + 1)
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

export default memoizeKey
