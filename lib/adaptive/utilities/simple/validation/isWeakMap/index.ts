/**
 * Type guard that checks if a value is a WeakMap object
 * 
 * Determines whether a value is an instance of the WeakMap constructor. WeakMaps
 * are collections of key-value pairs where keys must be objects and are held weakly,
 * meaning they don't prevent garbage collection when there are no other references.
 * Unlike regular Maps, WeakMaps are not enumerable and don't have a size property.
 * This function uses instanceof checking and provides TypeScript type narrowing.
 * 
 * WeakMap characteristics:
 * - Keys must be objects (not primitives)
 * - Keys are held weakly (garbage collectable)
 * - Not enumerable (no iteration methods)
 * - No size property or clear method
 * - Useful for metadata and private data
 * - Cross-realm: may fail for WeakMaps from different contexts
 * 
 * @param value - The value to check
 * @returns True if the value is a WeakMap, false otherwise
 * @example
 * ```typescript
 * // WeakMap instances
 * isWeakMap(new WeakMap())             // true
 * isWeakMap(new WeakMap([[{}, "value"]])) // true
 * 
 * // WeakMap with various key types
 * const wm = new WeakMap()
 * const obj = {}
 * const arr = []
 * const fn = () => {}
 * wm.set(obj, "object key")
 * wm.set(arr, "array key")
 * wm.set(fn, "function key")
 * isWeakMap(wm)                        // true
 * 
 * // Not WeakMaps
 * isWeakMap(new Map())                 // false (regular Map)
 * isWeakMap(new Set())                 // false
 * isWeakMap(new WeakSet())             // false
 * isWeakMap({})                        // false
 * isWeakMap([])                        // false
 * isWeakMap(null)                     // false
 * isWeakMap(undefined)                 // false
 * 
 * // WeakMap-like objects are not WeakMaps
 * isWeakMap({
 *   get: () => {},
 *   set: () => {},
 *   has: () => false,
 *   delete: () => false
 * })                                  // false
 * 
 * // Type narrowing in TypeScript
 * function storeMetadata(
 *   storage: unknown,
 *   obj: object,
 *   data: unknown
 * ): boolean {
 *   if (isWeakMap(storage)) {
 *     // TypeScript knows storage is WeakMap here
 *     storage.set(obj, data)
 *     return true
 *   }
 *   return false
 * }
 * 
 * const wm = new WeakMap()
 * storeMetadata(wm, {}, "metadata")    // true
 * storeMetadata(new Map(), {}, "data") // false
 * 
 * // Filtering WeakMaps from collections
 * const collections = [
 *   new WeakMap(),
 *   new Map(),
 *   new WeakSet(),
 *   new Set(),
 *   {},
 *   []
 * ]
 * 
 * const weakMaps = collections.filter(isWeakMap)
 * // [WeakMap {}]
 * 
 * // Private data implementation
 * const privateData = new WeakMap<object, unknown>()
 * 
 * class SecureClass {
 *   constructor(secret: string) {
 *     if (isWeakMap(privateData)) {
 *       privateData.set(this, { secret })
 *     }
 *   }
 *   
 *   getSecret(): string | undefined {
 *     if (isWeakMap(privateData)) {
 *       const data = privateData.get(this) as any
 *       return data?.secret
 *     }
 *     return undefined
 *   }
 * }
 * 
 * // Metadata storage system
 * class MetadataStore {
 *   private store: unknown
 *   
 *   constructor() {
 *     this.store = new WeakMap()
 *   }
 *   
 *   attach(obj: object, metadata: unknown): void {
 *     if (isWeakMap(this.store)) {
 *       this.store.set(obj, metadata)
 *     }
 *   }
 *   
 *   retrieve(obj: object): unknown {
 *     if (isWeakMap(this.store)) {
 *       return this.store.get(obj)
 *     }
 *     return undefined
 *   }
 * }
 * 
 * // Cache with weak references
 * function createWeakCache(): WeakMap<object, unknown> | null {
 *   const cache = new WeakMap()
 *   return isWeakMap(cache) ? cache : null
 * }
 * 
 * function getCached<T extends object, V>(
 *   cache: unknown,
 *   key: T,
 *   compute: () => V
 * ): V {
 *   if (isWeakMap(cache)) {
 *     if (cache.has(key)) {
 *       return cache.get(key) as V
 *     }
 *     const value = compute()
 *     cache.set(key, value)
 *     return value
 *   }
 *   return compute()
 * }
 * 
 * // DOM element data association
 * const elementData = new WeakMap<Element, unknown>()
 * 
 * function attachData(element: Element, data: unknown): void {
 *   if (isWeakMap(elementData)) {
 *     elementData.set(element, data)
 *   }
 * }
 * 
 * function getData(element: Element): unknown {
 *   if (isWeakMap(elementData)) {
 *     return elementData.get(element)
 *   }
 *   return undefined
 * }
 * 
 * // Memory leak prevention
 * class EventManager {
 *   private listeners: unknown
 *   
 *   constructor() {
 *     // WeakMap prevents memory leaks for removed DOM elements
 *     this.listeners = new WeakMap()
 *   }
 *   
 *   addListener(
 *     element: object,
 *     callback: Function
 *   ): void {
 *     if (isWeakMap(this.listeners)) {
 *       const callbacks = this.listeners.get(element) || []
 *       this.listeners.set(element, [...callbacks, callback])
 *     }
 *   }
 *   
 *   removeListeners(element: object): void {
 *     if (isWeakMap(this.listeners)) {
 *       this.listeners.delete(element)
 *     }
 *   }
 * }
 * 
 * // Object extension without modification
 * const extensions = new WeakMap<object, Record<string, unknown>>()
 * 
 * function extend(obj: object, props: Record<string, unknown>): void {
 *   if (isWeakMap(extensions)) {
 *     const existing = extensions.get(obj) || {}
 *     extensions.set(obj, { ...existing, ...props })
 *   }
 * }
 * 
 * function getExtension(obj: object, key: string): unknown {
 *   if (isWeakMap(extensions)) {
 *     const props = extensions.get(obj)
 *     return props?.[key]
 *   }
 *   return undefined
 * }
 * 
 * // WeakMap vs Map decision
 * function chooseStorage(
 *   needsEnumeration: boolean,
 *   keysAreObjects: boolean
 * ): Map<any, any> | WeakMap<object, any> {
 *   if (!needsEnumeration && keysAreObjects) {
 *     const wm = new WeakMap()
 *     return isWeakMap(wm) ? wm : new Map()
 *   }
 *   return new Map()
 * }
 * 
 * // Validation for WeakMap operations
 * function canUseAsWeakMapKey(value: unknown): boolean {
 *   return typeof value === "object" && value !== null
 * }
 * 
 * function safeWeakMapSet(
 *   map: unknown,
 *   key: unknown,
 *   value: unknown
 * ): boolean {
 *   if (isWeakMap(map) && canUseAsWeakMapKey(key)) {
 *     map.set(key as object, value)
 *     return true
 *   }
 *   return false
 * }
 * 
 * // React component instance tracking
 * const componentInstances = new WeakMap<object, unknown>()
 * 
 * function trackComponent(instance: object, data: unknown): void {
 *   if (isWeakMap(componentInstances)) {
 *     componentInstances.set(instance, data)
 *   }
 * }
 * 
 * function getComponentData(instance: object): unknown {
 *   if (isWeakMap(componentInstances)) {
 *     return componentInstances.get(instance)
 *   }
 *   return undefined
 * }
 * 
 * // Circular reference tracking
 * function createCircularTracker(): WeakMap<object, boolean> | null {
 *   const tracker = new WeakMap<object, boolean>()
 *   return isWeakMap(tracker) ? tracker : null
 * }
 * 
 * function hasCircularReference(
 *   obj: unknown,
 *   seen?: WeakMap<object, boolean>
 * ): boolean {
 *   if (!seen) {
 *     seen = new WeakMap()
 *   }
 *   
 *   if (!isWeakMap(seen)) return false
 *   
 *   if (typeof obj !== "object" || obj === null) {
 *     return false
 *   }
 *   
 *   if (seen.has(obj)) {
 *     return true
 *   }
 *   
 *   seen.set(obj, true)
 *   
 *   for (const value of Object.values(obj)) {
 *     if (hasCircularReference(value, seen)) {
 *       return true
 *     }
 *   }
 *   
 *   return false
 * }
 * 
 * // Observer pattern with weak references
 * class Subject {
 *   private observers: unknown
 *   
 *   constructor() {
 *     this.observers = new WeakMap()
 *   }
 *   
 *   subscribe(observer: object, callback: Function): void {
 *     if (isWeakMap(this.observers)) {
 *       this.observers.set(observer, callback)
 *     }
 *   }
 *   
 *   notify(observer: object, data: unknown): void {
 *     if (isWeakMap(this.observers)) {
 *       const callback = this.observers.get(observer)
 *       if (typeof callback === "function") {
 *         callback(data)
 *       }
 *     }
 *   }
 * }
 * 
 * // Memoization with object keys
 * function memoizeWithObjects<T extends object, R>(
 *   fn: (arg: T) => R
 * ): (arg: T) => R {
 *   const cache = new WeakMap<T, R>()
 *   
 *   return (arg: T): R => {
 *     if (isWeakMap(cache)) {
 *       if (cache.has(arg)) {
 *         return cache.get(arg)!
 *       }
 *       const result = fn(arg)
 *       cache.set(arg, result)
 *       return result
 *     }
 *     return fn(arg)
 *   }
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to WeakMap<object, unknown>
 * @property Instanceof - Uses instanceof WeakMap internally
 * @property Specific - Only returns true for WeakMap, not Map or other collections
 */
const isWeakMap = (value: unknown): value is WeakMap<object, unknown> => 
	value instanceof WeakMap

export default isWeakMap