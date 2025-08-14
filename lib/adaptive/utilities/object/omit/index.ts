import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with specified keys omitted
 * 
 * @param keys - Array of keys to omit from the object
 * @param obj - The object to omit from
 * @returns A new object without the specified keys
 * @example
 * ```typescript
 * omit(["c"])({ a: 1, b: 2, c: 3 }) // { a: 1, b: 2 }
 * ```
 */
const omit = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Omit<T, K> =>
	Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
	) as Omit<T, K>

export default omit
