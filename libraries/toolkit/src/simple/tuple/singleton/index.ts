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
 * @curried value => singleton
 * @param value - The value to wrap in a singleton tuple
 * @returns A tuple containing exactly one element
 * @example
 * ```typescript
 * // Basic usage
 * singleton(42)
 * // [42]
 *
 * singleton("hello")
 * // ["hello"]
 *
 * singleton({ id: 1, name: "Alice" })
 * // [{ id: 1, name: "Alice" }]
 *
 * // Type safety - result is Singleton<T>, not T[]
 * const id: Singleton<string> = singleton("user-123")
 * // id is typed as [string], not string[]
 *
 * // Guarantees exactly one element
 * const processOne = (items: Singleton<number>) => items[0] * 2
 * processOne(singleton(5)) // 10
 * // processOne([5, 6]) // ❌ Type error - not a singleton
 *
 * // Useful for wrapping single values for consistent APIs
 * const wrapId = singleton
 * const userIds = [1, 2, 3].map(wrapId)
 * // [[1], [2], [3]]
 *
 * // Can wrap any type including null/undefined
 * singleton(null)        // [null]
 * singleton(undefined)   // [undefined]
 *
 * // Nested singletons
 * singleton(singleton(5))
 * // [[5]]
 *
 * // With arrays - creates singleton containing an array
 * singleton([1, 2, 3])
 * // [[1, 2, 3]] - A singleton containing an array
 *
 * // Partial application for specific types
 * const wrapString = (s: string) => singleton(s)
 * wrapString("test")     // ["test"]
 *
 * // Use with flatMap to wrap results
 * [1, 2, 3].flatMap(x => singleton(x * 2))
 * // [2, 4, 6] (flattened)
 *
 * [1, 2, 3].map(x => singleton(x * 2))
 * // [[2], [4], [6]] (not flattened)
 *
 * // Compose with other functions
 * import { compose } from "../../combinator/compose"
 * import { map } from "../../array/map"
 *
 * const wrapEach = map(singleton)
 * wrapEach([1, 2, 3])   // [[1], [2], [3]]
 *
 * // Type narrowing in conditionals
 * function processValue<T>(value: T | Singleton<T>) {
 *   if (Array.isArray(value) && value.length === 1) {
 *     // TypeScript knows this is a singleton
 *     return value[0]
 *   }
 *   return value
 * }
 *
 * // Converting between single values and array APIs
 * const getValue = () => "result"
 * const getValues = () => singleton(getValue())
 * // Converts non-array API to array API
 *
 * // Pattern matching with destructuring
 * const [value] = singleton(100)
 * // value is 100
 *
 * // Ensuring non-empty arrays in function returns
 * function findOne(id: string): Singleton<User> | null {
 *   const user = database.find(id)
 *   return user ? singleton(user) : null
 * }
 * ```
 * @property Pure - No side effects
 * @property Total - Defined for all inputs
 * @property Type-safe - Returns Singleton<T> type, not T[]
 */
const singleton = <T>(value: T): Singleton<T> => {
	return [value]
}

export default singleton
