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
 * // WeakSet instances
 * isWeakSet(new WeakSet())             // true
 * isWeakSet(new WeakSet([{}, {}]))     // true
 * 
 * // WeakSet with various object types
 * const ws = new WeakSet()
 * const obj = {}
 * const arr = []
 * const fn = () => {}
 * ws.add(obj)
 * ws.add(arr)
 * ws.add(fn)
 * isWeakSet(ws)                        // true
 * 
 * // Not WeakSets
 * isWeakSet(new Set())                 // false (regular Set)
 * isWeakSet(new Map())                 // false
 * isWeakSet(new WeakMap())             // false
 * isWeakSet({})                        // false
 * isWeakSet([])                        // false
 * isWeakSet(null)                     // false
 * isWeakSet(undefined)                 // false
 * 
 * // WeakSet-like objects are not WeakSets
 * isWeakSet({
 *   add: () => {},
 *   has: () => false,
 *   delete: () => false
 * })                                  // false
 * 
 * // Type narrowing in TypeScript
 * function markObject(
 *   collection: unknown,
 *   obj: object
 * ): boolean {
 *   if (isWeakSet(collection)) {
 *     // TypeScript knows collection is WeakSet here
 *     collection.add(obj)
 *     return true
 *   }
 *   return false
 * }
 * 
 * const ws = new WeakSet()
 * markObject(ws, {})                   // true
 * markObject(new Set(), {})            // false
 * 
 * // Filtering WeakSets from collections
 * const collections = [
 *   new WeakSet(),
 *   new Set(),
 *   new WeakMap(),
 *   new Map(),
 *   {},
 *   []
 * ]
 * 
 * const weakSets = collections.filter(isWeakSet)
 * // [WeakSet {}]
 * 
 * // Object marking system
 * const processed = new WeakSet<object>()
 * 
 * function markAsProcessed(obj: object): void {
 *   if (isWeakSet(processed)) {
 *     processed.add(obj)
 *   }
 * }
 * 
 * function isProcessed(obj: object): boolean {
 *   if (isWeakSet(processed)) {
 *     return processed.has(obj)
 *   }
 *   return false
 * }
 * 
 * // Circular reference detection
 * function detectCircular(
 *   obj: unknown,
 *   seen?: WeakSet<object>
 * ): boolean {
 *   if (!seen) {
 *     seen = new WeakSet()
 *   }
 *   
 *   if (!isWeakSet(seen)) return false
 *   
 *   if (typeof obj !== "object" || obj === null) {
 *     return false
 *   }
 *   
 *   if (seen.has(obj)) {
 *     return true
 *   }
 *   
 *   seen.add(obj)
 *   
 *   for (const value of Object.values(obj)) {
 *     if (detectCircular(value, seen)) {
 *       return true
 *     }
 *   }
 *   
 *   return false
 * }
 * 
 * // Object visit tracking
 * class ObjectVisitor {
 *   private visited: unknown
 *   
 *   constructor() {
 *     this.visited = new WeakSet()
 *   }
 *   
 *   visit(obj: object): boolean {
 *     if (isWeakSet(this.visited)) {
 *       if (this.visited.has(obj)) {
 *         return false  // Already visited
 *       }
 *       this.visited.add(obj)
 *       return true
 *     }
 *     return false
 *   }
 *   
 *   hasVisited(obj: object): boolean {
 *     if (isWeakSet(this.visited)) {
 *       return this.visited.has(obj)
 *     }
 *     return false
 *   }
 * }
 * 
 * // DOM element tracking
 * const clickedElements = new WeakSet<Element>()
 * 
 * function markAsClicked(element: Element): void {
 *   if (isWeakSet(clickedElements)) {
 *     clickedElements.add(element)
 *   }
 * }
 * 
 * function hasBeenClicked(element: Element): boolean {
 *   if (isWeakSet(clickedElements)) {
 *     return clickedElements.has(element)
 *   }
 *   return false
 * }
 * 
 * // Validation for WeakSet operations
 * function canAddToWeakSet(value: unknown): boolean {
 *   return typeof value === "object" && value !== null
 * }
 * 
 * function safeWeakSetAdd(
 *   set: unknown,
 *   value: unknown
 * ): boolean {
 *   if (isWeakSet(set) && canAddToWeakSet(value)) {
 *     set.add(value as object)
 *     return true
 *   }
 *   return false
 * }
 * 
 * // Object tagging without modification
 * const tags = {
 *   important: new WeakSet<object>(),
 *   verified: new WeakSet<object>(),
 *   pending: new WeakSet<object>()
 * }
 * 
 * function addTag(obj: object, tag: keyof typeof tags): void {
 *   const tagSet = tags[tag]
 *   if (isWeakSet(tagSet)) {
 *     tagSet.add(obj)
 *   }
 * }
 * 
 * function hasTag(obj: object, tag: keyof typeof tags): boolean {
 *   const tagSet = tags[tag]
 *   if (isWeakSet(tagSet)) {
 *     return tagSet.has(obj)
 *   }
 *   return false
 * }
 * 
 * // Permission checking
 * class PermissionManager {
 *   private authorized: unknown
 *   
 *   constructor() {
 *     this.authorized = new WeakSet()
 *   }
 *   
 *   grant(obj: object): void {
 *     if (isWeakSet(this.authorized)) {
 *       this.authorized.add(obj)
 *     }
 *   }
 *   
 *   revoke(obj: object): void {
 *     if (isWeakSet(this.authorized)) {
 *       this.authorized.delete(obj)
 *     }
 *   }
 *   
 *   check(obj: object): boolean {
 *     if (isWeakSet(this.authorized)) {
 *       return this.authorized.has(obj)
 *     }
 *     return false
 *   }
 * }
 * 
 * // React component registration
 * const registeredComponents = new WeakSet<object>()
 * 
 * function registerComponent(component: object): void {
 *   if (isWeakSet(registeredComponents)) {
 *     registeredComponents.add(component)
 *   }
 * }
 * 
 * function isRegistered(component: object): boolean {
 *   if (isWeakSet(registeredComponents)) {
 *     return registeredComponents.has(component)
 *   }
 *   return false
 * }
 * 
 * // WeakSet vs Set decision
 * function chooseSetType(
 *   needsEnumeration: boolean,
 *   valuesAreObjects: boolean
 * ): Set<any> | WeakSet<object> {
 *   if (!needsEnumeration && valuesAreObjects) {
 *     const ws = new WeakSet()
 *     return isWeakSet(ws) ? ws : new Set()
 *   }
 *   return new Set()
 * }
 * 
 * // Object lifecycle tracking
 * const disposed = new WeakSet<object>()
 * 
 * class DisposableResource {
 *   private resource: object
 *   
 *   constructor() {
 *     this.resource = {}
 *   }
 *   
 *   dispose(): void {
 *     if (isWeakSet(disposed)) {
 *       disposed.add(this.resource)
 *     }
 *   }
 *   
 *   isDisposed(): boolean {
 *     if (isWeakSet(disposed)) {
 *       return disposed.has(this.resource)
 *     }
 *     return false
 *   }
 * }
 * 
 * // Memoization marking
 * const memoized = new WeakSet<Function>()
 * 
 * function memoize<T extends Function>(fn: T): T {
 *   if (isWeakSet(memoized)) {
 *     if (memoized.has(fn)) {
 *       return fn  // Already memoized
 *     }
 *     
 *     const cache = new Map()
 *     const wrapped = function(...args: any[]) {
 *       const key = JSON.stringify(args)
 *       if (!cache.has(key)) {
 *         cache.set(key, fn.apply(this, args))
 *       }
 *       return cache.get(key)
 *     }
 *     
 *     memoized.add(wrapped as any)
 *     return wrapped as T
 *   }
 *   return fn
 * }
 * 
 * // Deep clone visited tracking
 * function deepClone<T>(
 *   obj: T,
 *   visited?: WeakSet<object>
 * ): T {
 *   if (!visited) {
 *     visited = new WeakSet()
 *   }
 *   
 *   if (!isWeakSet(visited)) {
 *     throw new Error("Invalid visited set")
 *   }
 *   
 *   if (obj === null || typeof obj !== "object") {
 *     return obj
 *   }
 *   
 *   if (visited.has(obj)) {
 *     throw new Error("Circular reference detected")
 *   }
 *   
 *   visited.add(obj)
 *   
 *   if (Array.isArray(obj)) {
 *     return obj.map(item => deepClone(item, visited)) as T
 *   }
 *   
 *   const cloned: any = {}
 *   for (const [key, value] of Object.entries(obj)) {
 *     cloned[key] = deepClone(value, visited)
 *   }
 *   
 *   return cloned
 * }
 * 
 * // Event listener tracking
 * const hasListener = new WeakSet<object>()
 * 
 * function addEventListener(
 *   target: object,
 *   event: string,
 *   handler: Function
 * ): void {
 *   if (isWeakSet(hasListener)) {
 *     // Add event listener logic...
 *     hasListener.add(target)
 *   }
 * }
 * 
 * function removeEventListener(target: object): void {
 *   if (isWeakSet(hasListener)) {
 *     // Remove event listener logic...
 *     hasListener.delete(target)
 *   }
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to WeakSet<object>
 * @property Instanceof - Uses instanceof WeakSet internally
 * @property Specific - Only returns true for WeakSet, not Set or other collections
 */
const isWeakSet = (value: unknown): value is WeakSet<object> => 
	value instanceof WeakSet

export default isWeakSet