/**
 * Type guard that checks if a value is a WeakSet object
 *
 * Determines whether a value is an instance of the WeakSet constructor. WeakSets
 * are collections of objects held weakly, meaning they don't prevent garbage
 * collection when there are no other references. Unlike regular Sets, WeakSets
 * can only contain objects (not primitives), are not enumerable, and don't have
 * a size property. This function uses instanceof checking and provides TypeScript
 * type narrowing.
 *
 * WeakSet characteristics:
 * - Values must be objects (not primitives)
 * - Values are held weakly (garbage collectable)
 * - Not enumerable (no iteration methods)
 * - No size property or clear method
 * - Useful for marking objects without modifying them
 * - Cross-realm: may fail for WeakSets from different contexts
 *
 * @param value - The value to check
 * @returns True if the value is a WeakSet, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isWeakSet(new WeakSet())             // true
 * isWeakSet(new WeakSet([{}, {}]))     // true
 * isWeakSet(new Set())                 // false
 * isWeakSet(new WeakMap())             // false
 *
 * // Type narrowing
 * const value: unknown = new WeakSet()
 * if (isWeakSet(value)) {
 *   value.add({})  // TypeScript knows it's WeakSet
 * }
 *
 * // Filtering collections
 * const mixed = [new WeakSet(), new Set(), new Map()]
 * const weakSets = mixed.filter(isWeakSet)  // WeakSet[]
 *
 * // WeakSet-like objects are not WeakSets
 * isWeakSet({ add: () => {}, has: () => false })  // false
 * ```
 * @pure
 * @predicate
 */
const isWeakSet = (value: unknown): value is WeakSet<object> =>
	value instanceof WeakSet

export default isWeakSet
