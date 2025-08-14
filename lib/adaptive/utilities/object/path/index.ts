import type { Value } from "../../../types/index.ts"

/**
 * Retrieves a nested value from an object using a dot-separated path
 * 
 * @param pathStr - Dot-separated path string (e.g., "a.b.c")
 * @returns Function that takes an object and returns the value at the path
 * @example
 * ```typescript
 * path("a.b.c")({ a: { b: { c: "value" } } }) // "value"
 * path("x.y")({ a: { b: "value" } }) // undefined
 * path("user.name")({ user: { name: "John" } }) // "John"
 * ```
 */
const path = (pathStr: string) => (obj: Value): Value =>
	pathStr.split(".").reduce((acc, key) => acc?.[key], obj)

export default path
