import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

import lens from "../lens/index.ts"

/**
 * Creates a lens focused on an object property
 *
 * Returns a lens that focuses on a specific property of an object,
 * providing immutable get and set operations for that property.
 * This is a simpler alternative to lensPath for single-level access.
 *
 * @pure
 * @immutable
 * @param prop - The property key to focus on
 * @returns A lens focused on the specified property
 * @example
 * ```typescript
 * // Basic property lens
 * const nameLens = lensProp("name")
 * const person = { name: "Alice", age: 30 }
 * nameLens.get(person)                    // "Alice"
 * nameLens.set("Bob")(person)             // { name: "Bob", age: 30 }
 *
 * // Missing property - set adds it
 * const missingLens = lensProp("missing")
 * missingLens.get({ a: 1, b: 2 })         // undefined
 * missingLens.set("value")({ a: 1, b: 2 }) // { a: 1, b: 2, missing: "value" }
 *
 * // Symbol properties
 * const sym = Symbol("id")
 * const symLens = lensProp(sym)
 * const obj = { [sym]: 123, name: "test" }
 * symLens.get(obj)                        // 123
 * symLens.set(456)(obj)                   // { [Symbol(id)]: 456, name: "test" }
 *
 * // Composing updates
 * const xLens = lensProp("x")
 * const yLens = lensProp("y")
 * const point = { x: 10, y: 20 }
 * const movePoint = yLens.set(30)(xLens.set(15)(point))
 * // { x: 15, y: 30 }
 *
 * // Type-safe property access
 * type User = { id: number; email: string; active: boolean }
 * const emailLens = lensProp<User, "email">("email")
 * const user: User = { id: 1, email: "old@ex.com", active: true }
 * emailLens.get(user)                     // "old@ex.com"
 * emailLens.set("new@ex.com")(user)       // { id: 1, email: "new@ex.com", active: true }
 * ```
 */
const lensProp = <T extends Record<string | symbol, Value>, K extends keyof T>(
	prop: K,
): Lens<T, T[K]> => {
	return lens<T, T[K]>(
		// Getter: access the property
		(obj) => obj[prop],
	)(
		// Setter: immutably update the property
		(value) => (obj) => ({
			...obj,
			[prop]: value,
		}),
	)
}

export default lensProp
