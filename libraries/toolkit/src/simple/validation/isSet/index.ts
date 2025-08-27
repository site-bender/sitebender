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
 * isSet(new Set())                     // true
 * isSet(new Set([1, 2, 3]))           // true
 * isSet(new Set("hello"))              // true
 *
 * // Not Sets
 * isSet(new WeakSet())                 // false
 * isSet(new Map())                     // false
 * isSet([])                           // false
 * isSet(null)                         // false
 *
 * // Type narrowing
 * const getSetSize = (value: unknown): number =>
 *   isSet(value) ? value.size : 0
 *
 * getSetSize(new Set([1, 2, 3]))      // 3
 * getSetSize([1, 2, 3])               // 0
 *
 * // Filtering Sets
 * const collections = [new Set(), new Map(), [], new Set([1, 2])]
 * const sets = collections.filter(isSet)  // [Set {}, Set {1, 2}]
 *
 * // Safe operations
 * const safeAdd = <T>(value: unknown, item: T): Set<T> | null =>
 *   isSet(value) ? (value.add(item), value as Set<T>) : null
 *
 * // Array to Set conversion
 * const toSet = <T>(value: unknown): Set<T> => {
 *   if (isSet(value)) return value as Set<T>
 *   if (Array.isArray(value)) return new Set(value)
 *   return new Set()
 * }
 *
 * // Set operations
 * const intersection = (a: unknown, b: unknown): Set<unknown> => {
 *   if (!isSet(a) || !isSet(b)) return new Set()
 *   return new Set(Array.from(a).filter(x => b.has(x)))
 * }
 *
 * intersection(new Set([1, 2, 3]), new Set([2, 3, 4]))  // Set {2, 3}
 *
 * // Deduplication helper
 * function deduplicate<T>(items: Array<T>): Array<T> {
 *   const seen = new Set<T>()
 *   const result: Array<T> = []
 *
 *   for (const item of items) {
 *     if (!seen.has(item)) {
 *       seen.add(item)
 *       result.push(item)
 *     }
 *   }
 *
 *   return result
 * }
 *
 * // Set cloning
 * function cloneSet(value: unknown): Set<unknown> | null {
 *   if (isSet(value)) {
 *     return new Set(value)
 *   }
 *   return null
 * }
 *
 * const original = new Set([1, 2, 3])
 * const cloned = cloneSet(original)
 * // New Set with same values
 *
 * // Permission checking system
 * class Permissions {
 *   private perms: unknown
 *
 *   constructor(initial?: unknown) {
 *     this.perms = isSet(initial) ? initial : new Set()
 *   }
 *
 *   has(permission: string): boolean {
 *     return isSet(this.perms) && this.perms.has(permission)
 *   }
 *
 *   grant(permission: string): void {
 *     if (isSet(this.perms)) {
 *       this.perms.add(permission)
 *     }
 *   }
 * }
 *
 * // React state with Sets
 * function useSetState<T>(initial: Array<T> = []) {
 *   const [state, setState] = useState(() => new Set(initial))
 *
 *   const add = (item: T) => {
 *     setState(prev => {
 *       if (isSet(prev)) {
 *         const next = new Set(prev)
 *         next.add(item)
 *         return next
 *       }
 *       return prev
 *     })
 *   }
 *
 *   return [state, add] as const
 * }
 *
 * // Tag system
 * interface Taggable {
 *   tags: unknown
 * }
 *
 * function hasTag(item: Taggable, tag: string): boolean {
 *   return isSet(item.tags) && item.tags.has(tag)
 * }
 *
 * function addTag(item: Taggable, tag: string): void {
 *   if (!isSet(item.tags)) {
 *     item.tags = new Set()
 *   }
 *   (item.tags as Set<string>).add(tag)
 * }
 *
 * // Symmetric difference
 * function symmetricDifference(a: unknown, b: unknown): Set<unknown> {
 *   if (!isSet(a) || !isSet(b)) {
 *     return new Set()
 *   }
 *
 *   const result = new Set<unknown>()
 *
 *   // Items in a but not in b
 *   for (const item of a) {
 *     if (!b.has(item)) {
 *       result.add(item)
 *     }
 *   }
 *
 *   // Items in b but not in a
 *   for (const item of b) {
 *     if (!a.has(item)) {
 *       result.add(item)
 *     }
 *   }
 *
 *   return result
 * }
 *
 * symmetricDifference(
 *   new Set([1, 2, 3]),
 *   new Set([2, 3, 4])
 * )                                   // Set { 1, 4 }
 * ```
 * @pure
 * @predicate
 */
const isSet = (value: unknown): value is Set<unknown> => value instanceof Set

export default isSet
