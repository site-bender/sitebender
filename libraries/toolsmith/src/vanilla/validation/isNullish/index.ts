/**
 * Type guard that checks if a value is null or undefined (nullish)
 *
 * Determines whether a value is either null or undefined, the two nullish values
 * in JavaScript. This is a type guard function that narrows the type to null | undefined,
 * helping TypeScript understand when a value is absent. Uses loose equality (==) with null
 * to check both null and undefined in a single, idiomatic comparison.
 *
 * This predicate is valuable for:
 * - Checking if optional values are absent
 * - Implementing default value logic
 * - Validating missing data in objects
 * - Short-circuit evaluation in data pipelines
 *
 * @param value - The value to check for nullish status
 * @returns True if the value is null or undefined, false otherwise
 * @example
 * ```typescript
 * // Nullish values
 * isNullish(null)      // true
 * isNullish(undefined) // true
 *
 * // Non-nullish values (falsy but not nullish)
 * isNullish(0)         // false
 * isNullish("")        // false
 * isNullish(false)     // false
 * isNullish(NaN)       // false
 *
 * // Type narrowing
 * const value: string | null | undefined = getValue()
 * if (isNullish(value)) {
 *   // value is null | undefined here
 * } else {
 *   console.log(value.toUpperCase()) // value is string
 * }
 *
 * // Default value pattern
 * const getConfig = <T>(value: T | null | undefined, defaultValue: T): T =>
 *   isNullish(value) ? defaultValue : value
 *
 * getConfig(null, "default")  // "default"
 * getConfig(0, 10)            // 0 (zero is not nullish)
 *
 * // Filtering nullish values
 * const mixed = [1, null, 2, undefined, 3, 0, false]
 * const nonNullish = mixed.filter(x => !isNullish(x))
 * // [1, 2, 3, 0, false]
 * ```
 * @pure
 * @predicate
 */
const isNullish = <T>(value: T | null | undefined): value is null | undefined =>
	value === null || value === undefined

export default isNullish
