import isNullish from "../../validation/isNullish/index.ts"
import sortByKey from "./sortByKey/index.ts"
import map from "../../array/map/index.ts"
import join from "../../array/join/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isObject from "../../validation/isObject/index.ts"
import isEmpty from "../../array/isEmpty/index.ts"
import sort from "../../array/sort/index.ts"
import toString from "../../conversion/castValue/toString/index.ts"
import entries from "../../object/entries/index.ts"

/**
 * Creates a deterministic string representation of objects/arrays
 *
 * Converts values to a unique, sortable string key format. Unlike JSON,
 * this creates a consistent string regardless of property order, making
 * it ideal for cache keys, memoization, and deduplication. Objects have
 * their keys sorted alphabetically, and the format uses semicolons and
 * colons as delimiters instead of JSON syntax.
 *
 * Format:
 * - Objects: "key1:value1;key2:value2" (keys sorted)
 * - Arrays: "value1;value2;value3"
 * - Primitives: string representation
 * - Nested: recursive stringification
 *
 * @param value - The value to stringify deterministically
 * @returns A deterministic string representation
 * @example
 * ```typescript
 * // Objects (keys automatically sorted)
 * stringify({ b: 2, a: 1 })              // "a:1;b:2"
 * stringify({ z: 3, a: 1, m: 2 })        // "a:1;m:2;z:3"
 * stringify({ name: "John", age: 30 })   // "age:30;name:John"
 *
 * // Same object, different key order = same result
 * stringify({ x: 1, y: 2 }) ===
 * stringify({ y: 2, x: 1 })              // true
 *
 * // Arrays (order preserved)
 * stringify([1, 2, 3])                   // "1;2;3"
 * stringify(["a", "b", "c"])             // "a;b;c"
 * stringify([])                          // ""
 *
 * // Nested structures
 * stringify({ a: { b: 1, c: 2 } })       // "a:b:1;c:2"
 * stringify([{ x: 1 }, { y: 2 }])       // "x:1;y:2"
 * stringify({
 *   users: ["Alice", "Bob"],
 *   count: 2
 * })                                     // "count:2;users:Alice;Bob"
 *
 * // Primitives
 * stringify("hello")                     // "hello"
 * stringify(42)                          // "42"
 * stringify(true)                        // "true"
 * stringify(null)                        // ""
 * stringify(undefined)                   // ""
 *
 * // Empty values
 * stringify({})                          // ""
 * stringify([])                          // ""
 * stringify("")                          // ""
 *
 * // Cache key generation
 * function getCacheKey(operation: string, params: Record<string, unknown>) {
 *   return `${operation}:${stringify(params)}`
 * }
 *
 * getCacheKey("search", { query: "test", page: 1 })
 * // "search:page:1;query:test"
 *
 * getCacheKey("search", { page: 1, query: "test" })
 * // "search:page:1;query:test" (same result!)
 *
 * // Memoization keys
 * const cache = new Map<string, unknown>()
 *
 * function memoizedFn(args: Record<string, unknown>) {
 *   const key = stringify(args)
 *
 *   if (cache.has(key)) {
 *     return cache.get(key)
 *   }
 *
 *   const result = expensiveOperation(args)
 *   cache.set(key, result)
 *   return result
 * }
 *
 * // Deduplication
 * function deduplicate<T>(items: T[]): T[] {
 *   const seen = new Set<string>()
 *   const result: T[] = []
 *
 *   for (const item of items) {
 *     const key = stringify(item)
 *     if (!seen.has(key)) {
 *       seen.add(key)
 *       result.push(item)
 *     }
 *   }
 *
 *   return result
 * }
 *
 * deduplicate([
 *   { a: 1, b: 2 },
 *   { b: 2, a: 1 },  // duplicate (different key order)
 *   { a: 1, b: 3 }
 * ])
 * // [{ a: 1, b: 2 }, { a: 1, b: 3 }]
 *
 * // Comparison with JSON.stringify
 * const obj = { b: 2, a: 1 }
 * JSON.stringify(obj)                    // '{"b":2,"a":1}' (key order varies)
 * stringify(obj)                         // "a:1;b:2" (always sorted)
 *
 * // Complex nested example
 * stringify({
 *   metadata: {
 *     version: 2,
 *     author: "Alice"
 *   },
 *   data: [1, 2, { x: 3 }],
 *   flags: {
 *     enabled: true,
 *     debug: false
 *   }
 * })
 * // "data:1;2;x:3;flags:debug:false;enabled:true;metadata:author:Alice;version:2"
 * ```
 * @pure
 * @immutable
 */
export default function stringify(value: unknown): string {
	// Handle null and undefined
	if (isNullish(value)) {
		return ""
	}

	// Handle arrays
	if (isArray(value)) {
		return join(";")(map(stringify)(value))
	}

	// Handle objects
	if (isObject(value)) {
		// Get entries and sort by key
		const entryList = entries(
			value as Record<string, import("../../../types/index.ts").Value>,
		)

		if (isEmpty(entryList)) {
			return ""
		}

		const sorted = sort(sortByKey)(entryList)

		function formatEntry([key, val]: [string, unknown]): string {
			return `${key}:${stringify(val)}`
		}

		const mapped = map(formatEntry)(sorted)
		return join(";")(mapped)
	}

	// Handle primitives (string, number, boolean)
	return toString(value)
}
