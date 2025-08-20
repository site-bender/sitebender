import type { Lens } from "../../simple/object/lens/index.ts"

/**
 * Checks if value at lens focus is less than or equal to another
 * 
 * Creates a predicate function that checks if the value at the lens focus
 * is less than or equal to a given value. Works with numbers, strings,
 * dates, and any comparable values. Useful for filtering, validation, and
 * range checks on nested properties.
 * 
 * @curried (lens) => (value) => (subject) => boolean
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value is <= the given value
 * @example
 * ```typescript
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 * import { lensPath } from "../../simple/object/lensPath/index.ts"
 * 
 * // Number comparison
 * const ageLens = lensProp("age")
 * const isChild = lensLte(ageLens)(12)
 * 
 * isChild({ name: "Alice", age: 10 })          // true
 * isChild({ name: "Bob", age: 15 })            // false
 * isChild({ name: "Charlie", age: 12 })        // true (equal)
 * 
 * // Maximum value check
 * const priceLens = lensProp("price")
 * const isAffordable = lensLte(priceLens)(50)
 * 
 * const products = [
 *   { name: "Widget", price: 25 },
 *   { name: "Gadget", price: 75 },
 *   { name: "Tool", price: 50 },
 *   { name: "Device", price: 100 }
 * ]
 * 
 * products.filter(isAffordable)
 * // [{ name: "Widget", price: 25 }, { name: "Tool", price: 50 }]
 * 
 * // String comparison (alphabetical)
 * const nameLens = lensProp("name")
 * const isBeforeN = lensLte(nameLens)("M")
 * 
 * const people = [
 *   { name: "Alice" },
 *   { name: "Nancy" },
 *   { name: "Bob" },
 *   { name: "Mike" }
 * ]
 * 
 * people.filter(isBeforeN)
 * // [{ name: "Alice" }, { name: "Bob" }, { name: "Mike" }]
 * 
 * // Date comparison
 * const expiryLens = lensProp("expiry")
 * const cutoffDate = new Date("2024-12-31")
 * const expiresThisYear = lensLte(expiryLens)(cutoffDate)
 * 
 * const subscriptions = [
 *   { plan: "Basic", expiry: new Date("2024-06-30") },
 *   { plan: "Pro", expiry: new Date("2025-01-15") },
 *   { plan: "Enterprise", expiry: new Date("2024-12-31") }
 * ]
 * 
 * subscriptions.filter(expiresThisYear)
 * // [{ plan: "Basic", ... }, { plan: "Enterprise", ... }]
 * 
 * // Nested property check
 * const limitLens = lensPath(["config", "maxRetries"])
 * const isReasonable = lensLte(limitLens)(5)
 * 
 * const services = [
 *   { name: "API", config: { maxRetries: 3 } },
 *   { name: "Database", config: { maxRetries: 10 } },
 *   { name: "Cache", config: { maxRetries: 5 } }
 * ]
 * 
 * services.filter(isReasonable)
 * // [{ name: "API", ... }, { name: "Cache", ... }]
 * 
 * // Array length check
 * import { composeLens } from "../composeLens/index.ts"
 * 
 * const itemsLens = lensProp("items")
 * const lengthLens = lens<Array<any>, number>(
 *   arr => arr.length,
 *   len => arr => arr  // Read-only for length
 * )
 * const itemsLengthLens = composeLens(itemsLens, lengthLens)
 * const hasMaxItems = lensLte(itemsLengthLens)(10)
 * 
 * const carts = [
 *   { id: 1, items: Array(5).fill("item") },
 *   { id: 2, items: Array(15).fill("item") },
 *   { id: 3, items: Array(10).fill("item") }
 * ]
 * 
 * carts.filter(hasMaxItems)
 * // [{ id: 1, ... }, { id: 3, ... }]
 * 
 * // CPU usage check
 * const cpuLens = lensProp("cpu")
 * const isNotOverloaded = lensLte(cpuLens)(80)
 * 
 * const servers = [
 *   { name: "server1", cpu: 45 },
 *   { name: "server2", cpu: 95 },
 *   { name: "server3", cpu: 80 }
 * ]
 * 
 * servers.filter(isNotOverloaded)
 * // [{ name: "server1", cpu: 45 }, { name: "server3", cpu: 80 }]
 * 
 * // Version constraint
 * const versionLens = lensProp("version")
 * const isCompatible = lensLte(versionLens)("3.0.0")
 * 
 * const dependencies = [
 *   { name: "lib-a", version: "2.5.0" },
 *   { name: "lib-b", version: "3.0.0" },
 *   { name: "lib-c", version: "4.1.0" }
 * ]
 * 
 * dependencies.filter(isCompatible)
 * // [{ name: "lib-a", ... }, { name: "lib-b", ... }]
 * 
 * // Priority filtering (lower is higher priority)
 * const priorityLens = lensProp("priority")
 * const isUrgent = lensLte(priorityLens)(2)
 * 
 * const tickets = [
 *   { id: "T1", priority: 1 },
 *   { id: "T2", priority: 5 },
 *   { id: "T3", priority: 2 },
 *   { id: "T4", priority: 3 }
 * ]
 * 
 * tickets.filter(isUrgent)
 * // [{ id: "T1", priority: 1 }, { id: "T3", priority: 2 }]
 * 
 * // Distance filtering
 * const distanceLens = lensProp("distance")
 * const isNearby = lensLte(distanceLens)(5)  // 5 km
 * 
 * const stores = [
 *   { name: "Store A", distance: 2.5 },
 *   { name: "Store B", distance: 8.3 },
 *   { name: "Store C", distance: 5.0 }
 * ]
 * 
 * stores.filter(isNearby)
 * // [{ name: "Store A", distance: 2.5 }, { name: "Store C", distance: 5.0 }]
 * 
 * // File size check
 * const sizeLens = lensPath(["metadata", "size"])
 * const isSmallFile = lensLte(sizeLens)(1024 * 1024)  // 1MB
 * 
 * const files = [
 *   { name: "doc.pdf", metadata: { size: 500000 } },
 *   { name: "video.mp4", metadata: { size: 5000000 } },
 *   { name: "image.jpg", metadata: { size: 1048576 } }
 * ]
 * 
 * files.filter(isSmallFile)
 * // [{ name: "doc.pdf", ... }, { name: "image.jpg", ... }]
 * 
 * // Combined conditions
 * const scoreLens = lensProp("score")
 * const timeLens = lensProp("time")
 * const qualifies = (entry: any) =>
 *   lensLte(scoreLens)(100)(entry) &&  // Max score
 *   lensLte(timeLens)(60)(entry)       // Max time in seconds
 * 
 * const results = [
 *   { player: "Alice", score: 95, time: 45 },
 *   { player: "Bob", score: 105, time: 55 },
 *   { player: "Charlie", score: 100, time: 65 }
 * ]
 * 
 * results.filter(qualifies)
 * // [{ player: "Alice", score: 95, time: 45 }]
 * ```
 * @property Pure - No side effects
 * @property Curried - Can be partially applied
 * @property Type-safe - Maintains type information through lens
 */
const lensLte = <S, A>(lens: Lens<S, A>) => 
	(value: A) => 
		(subject: S): boolean => 
			lens.get(subject) <= value

export default lensLte