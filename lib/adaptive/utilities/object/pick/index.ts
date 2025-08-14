import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with only the specified keys
 * 
 * @param keys - Array of keys to pick from the object
 * @param obj - The object to pick from
 * @returns A new object with only the specified keys
 * @example
 * ```typescript
 * pick(["a", "b"])({ a: 1, b: 2, c: 3 }) // { a: 1, b: 2 }
 * ```
 */
const pick = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Pick<T, K> =>
	Object.fromEntries(
		Object.entries(obj).filter(([key]) => keys.includes(key as K)),
	) as Pick<T, K>

export default pick
