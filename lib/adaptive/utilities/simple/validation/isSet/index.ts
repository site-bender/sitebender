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
 * isSet(new Set("hello"))              // true (from string iterable)
 * 
 * // Sets with various value types
 * isSet(new Set([1, "two", true]))     // true
 * isSet(new Set([{}, {}, {}]))         // true (each object is unique)
 * 
 * const symbolSet = new Set([Symbol("a"), Symbol("b")])
 * isSet(symbolSet)                     // true
 * 
 * // Not Sets
 * isSet(new WeakSet())                 // false (WeakSet)
 * isSet(new Map())                     // false (Map)
 * isSet([])                           // false (array)
 * isSet([1, 2, 3])                    // false (array)
 * isSet({})                           // false (plain object)
 * isSet(null)                         // false
 * isSet(undefined)                    // false
 * isSet("Set")                        // false
 * 
 * // Set-like objects are not Sets
 * isSet({
 *   add: () => {},
 *   delete: () => {},
 *   has: () => false,
 *   size: 0
 * })                                  // false
 * 
 * // Type narrowing in TypeScript
 * function getSetSize(value: unknown): number {
 *   if (isSet(value)) {
 *     // TypeScript knows value is Set here
 *     return value.size
 *   }
 *   return 0
 * }
 * 
 * getSetSize(new Set([1, 2, 3]))      // 3
 * getSetSize(new Map())               // 0
 * getSetSize([1, 2, 3])               // 0
 * 
 * // Filtering Sets from mixed collections
 * const collections = [
 *   new Set(),
 *   new Map(),
 *   new WeakSet(),
 *   [],
 *   {},
 *   new Set(["a", "b", "c"])
 * ]
 * 
 * const sets = collections.filter(isSet)
 * // [Set {}, Set { "a", "b", "c" }]
 * 
 * // Set operations safety
 * function safeSetAdd<T>(
 *   value: unknown,
 *   item: T
 * ): Set<T> | null {
 *   if (isSet(value)) {
 *     value.add(item)
 *     return value as Set<T>
 *   }
 *   return null
 * }
 * 
 * const mySet = new Set([1, 2])
 * safeSetAdd(mySet, 3)                // Set { 1, 2, 3 }
 * safeSetAdd([], 3)                   // null
 * 
 * // Converting arrays to Sets
 * function toSet<T>(value: unknown): Set<T> {
 *   if (isSet(value)) {
 *     return value as Set<T>
 *   }
 *   if (Array.isArray(value)) {
 *     return new Set(value)
 *   }
 *   if (value && typeof (value as any)[Symbol.iterator] === "function") {
 *     return new Set(value as Iterable<T>)
 *   }
 *   return new Set()
 * }
 * 
 * toSet(new Set([1, 2]))              // Set { 1, 2 }
 * toSet([1, 2, 2, 3])                 // Set { 1, 2, 3 }
 * toSet("hello")                      // Set { "h", "e", "l", "o" }
 * toSet(null)                         // Set {}
 * 
 * // Unique values extraction
 * function getUniqueValues(value: unknown): Array<unknown> {
 *   if (isSet(value)) {
 *     return Array.from(value)
 *   }
 *   if (Array.isArray(value)) {
 *     return Array.from(new Set(value))
 *   }
 *   return []
 * }
 * 
 * getUniqueValues(new Set([1, 2, 3])) // [1, 2, 3]
 * getUniqueValues([1, 2, 2, 3, 3])    // [1, 2, 3]
 * getUniqueValues("aabbcc")           // []
 * 
 * // Set intersection
 * function intersection(a: unknown, b: unknown): Set<unknown> {
 *   if (!isSet(a) || !isSet(b)) {
 *     return new Set()
 *   }
 *   
 *   const result = new Set<unknown>()
 *   for (const item of a) {
 *     if (b.has(item)) {
 *       result.add(item)
 *     }
 *   }
 *   return result
 * }
 * 
 * intersection(
 *   new Set([1, 2, 3]),
 *   new Set([2, 3, 4])
 * )                                   // Set { 2, 3 }
 * 
 * // Set union
 * function union(...values: Array<unknown>): Set<unknown> {
 *   const result = new Set<unknown>()
 *   
 *   for (const value of values) {
 *     if (isSet(value)) {
 *       for (const item of value) {
 *         result.add(item)
 *       }
 *     }
 *   }
 *   
 *   return result
 * }
 * 
 * union(
 *   new Set([1, 2]),
 *   new Set([2, 3]),
 *   [4, 5],  // ignored, not a Set
 *   new Set([3, 4])
 * )                                   // Set { 1, 2, 3, 4 }
 * 
 * // Set difference
 * function difference(a: unknown, b: unknown): Set<unknown> {
 *   if (!isSet(a)) return new Set()
 *   if (!isSet(b)) return new Set(a)
 *   
 *   const result = new Set<unknown>()
 *   for (const item of a) {
 *     if (!b.has(item)) {
 *       result.add(item)
 *     }
 *   }
 *   return result
 * }
 * 
 * difference(
 *   new Set([1, 2, 3, 4]),
 *   new Set([3, 4, 5])
 * )                                   // Set { 1, 2 }
 * 
 * // Membership checking
 * function hasValue(collection: unknown, value: unknown): boolean {
 *   if (isSet(collection)) {
 *     return collection.has(value)
 *   }
 *   if (Array.isArray(collection)) {
 *     return collection.includes(value)
 *   }
 *   return false
 * }
 * 
 * const dataSet = new Set(["a", "b", "c"])
 * hasValue(dataSet, "b")              // true
 * hasValue(dataSet, "d")              // false
 * hasValue(["a", "b"], "b")           // true
 * hasValue({}, "b")                   // false
 * 
 * // Set to array conversion
 * function setToArray<T>(value: unknown): Array<T> {
 *   if (isSet(value)) {
 *     return Array.from(value) as Array<T>
 *   }
 *   return []
 * }
 * 
 * setToArray(new Set([1, 2, 3]))      // [1, 2, 3]
 * setToArray([1, 2, 3])               // []
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
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to Set<unknown>
 * @property Instanceof - Uses instanceof Set internally
 * @property Specific - Only returns true for Set, not WeakSet or other collections
 */
const isSet = (value: unknown): value is Set<unknown> => 
	value instanceof Set

export default isSet