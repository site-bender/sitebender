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
 * // Basic checks
 * isWeakMap(new WeakMap())      // true
 * isWeakMap(new Map())          // false
 * isWeakMap(new WeakSet())      // false
 * isWeakMap({})                 // false
 *
 * // Type narrowing
 * const storeMetadata = (storage: unknown, obj: object, data: unknown): boolean =>
 *   isWeakMap(storage) ? (storage.set(obj, data), true) : false
 *
 * // Private data implementation
 * const privateData = new WeakMap<object, unknown>()
 *
 * class SecureClass {
 *   constructor(secret: string) {
 *     privateData.set(this, { secret })
 *   }
 *   getSecret(): string | undefined {
 *     return (privateData.get(this) as any)?.secret
 *   }
 * }
 *
 * // DOM element metadata
 * const elementData = new WeakMap<Element, unknown>()
 * const attachData = (el: Element, data: unknown) =>
 *   isWeakMap(elementData) && elementData.set(el, data)
 * ```
 * @pure
 * @predicate
 */
const isWeakMap = (value: unknown): value is WeakMap<object, unknown> =>
	value instanceof WeakMap

export default isWeakMap
