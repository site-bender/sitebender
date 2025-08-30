/**
 * Type guard that checks if a value is a Set object
 *
 * Determines whether a value is an instance of the Set constructor. Sets are
 * collections of unique values where each value can occur only once. Unlike arrays,
 * Sets provide constant-time add, delete, and has operations. This function uses
 * instanceof checking and provides TypeScript type narrowing to Set<unknown>.
 *
 * Set detection:
 * - Set instances: created with new Set()
 * - Includes Sets created from iterables: new Set([...])
 * - Works with Sets of any value types
 * - Not included: WeakSets (use isWeakSet)
 * - Not included: arrays or other collections
 * - Cross-realm: may fail for Sets from different contexts
 *
 * @param value - The value to check
 * @returns True if the value is a Set, false otherwise
 * @example
 * ```typescript
 * // Set instances
 * isSet(new Set())              // true
 * isSet(new Set([1, 2, 3]))    // true
 * isSet(new Set("hello"))       // true
 *
 * // Not Sets
 * isSet(new WeakSet())          // false
 * isSet(new Map())              // false
 * isSet([])                     // false
 * isSet(null)                   // false
 *
 * // Type narrowing
 * const getSetSize = (value: unknown): number =>
 *   isSet(value) ? value.size : 0
 *
 * getSetSize(new Set([1, 2, 3]))  // 3
 * getSetSize([1, 2, 3])           // 0
 *
 * // Filtering Sets from mixed collections
 * const collections = [new Set(), new Map(), [], new Set([1, 2])]
 * const sets = collections.filter(isSet)  // [Set {}, Set {1, 2}]
 *
 * // Set operations
 * const intersection = (a: unknown, b: unknown): Set<unknown> => {
 *   if (!isSet(a) || !isSet(b)) return new Set()
 *   return new Set(Array.from(a).filter(x => b.has(x)))
 * }
 *
 * intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))  // Set {2, 3}
 * ```
 * @pure
 * @predicate
 */
const isSet = (value: unknown): value is Set<unknown> => value instanceof Set

export default isSet
