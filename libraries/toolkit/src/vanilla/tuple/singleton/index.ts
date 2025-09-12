import type { Singleton } from "../../../types/tuple/index.ts"

/**
 * Creates a one-element tuple (Singleton) from a value
 *
 * A singleton tuple provides a type-safe way to ensure an array contains
 * exactly one element. This is useful for:
 * - API boundaries that require exactly one value in array form
 * - Distinguishing single values from potentially empty or multi-element arrays
 * - Maintaining consistency with other tuple types in generic programming
 * - Self-documenting code where the single-element constraint is important
 *
 * The function is curried to allow partial application and composition.
 *
 * @param value - The value to wrap in a singleton tuple
 * @returns A tuple containing exactly one element
 * @example
 * ```typescript
 * // Basic usage
 * singleton(42)             // [42]
 * singleton("hello")        // ["hello"]
 * singleton({ id: 1 })      // [{ id: 1 }]
 *
 * // Type safety - result is Singleton<T>, not T[]
 * import type { Singleton } from "../../../types/tuple"
 * const id: Singleton<string> = singleton("user-123")
 * // id is typed as [string], not string[]
 *
 * // Can wrap any type including null/undefined
 * singleton(null)        // [null]
 * singleton(undefined)   // [undefined]
 * singleton([1, 2, 3])   // [[1, 2, 3]] - singleton containing an array
 *
 * // Use with map to wrap each element
 * import map from "../../array/map"
 * const wrapEach = map(singleton)
 * wrapEach([1, 2, 3])   // [[1], [2], [3]]
 *
 * // Pattern matching with destructuring
 * const [value] = singleton(100)
 * // value is 100
 * ```
 * @pure
 * @curried
 */
const singleton = <T>(value: T): Singleton<T> => {
	return [value]
}

export default singleton
