import type { Value } from "../../../types/index.ts"

/**
 * Immutably sets a value at a nested path in an object
 *
 * Creates a new object with the value at the specified path updated.
 * Intermediate objects are created as needed. The original object is not modified.
 * Supports both dot notation strings and array paths.
 *
 * @param pathInput - Dot-separated string or array of keys where to set the value
 * @param value - The value to set at the path
 * @param obj - The object to update
 * @returns A new object with the value set at the path
 * @example
 * // Set a simple property
 * set("name")("Bob")({ name: "Alice", age: 30 })
 * // { name: "Bob", age: 30 }
 *
 * // Set a nested property
 * set("user.email")("new@example.com")({
 *   user: { name: "Alice", email: "old@example.com" }
 * })
 * // { user: { name: "Alice", email: "new@example.com" } }
 *
 * // Create intermediate objects as needed
 * set("a.b.c")(42)({})
 * // { a: { b: { c: 42 } } }
 *
 * // Array path notation
 * set(["user", "settings", "theme"])("dark")({
 *   user: { settings: { theme: "light" } }
 * })
 * // { user: { settings: { theme: "dark" } } }
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const set =
	(pathInput: string | Array<string | number>) =>
	<V extends Value>(value: V) =>
	<T extends Record<string, Value>>(obj: T | null | undefined): T => {
		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path means replace entire object
		if (keys.length === 0) {
			return value as T
		}

		// Helper to determine if a key should create an array or object
		const shouldBeArray = (key: string | number): boolean => {
			// If current key is a number, parent should be array
			return typeof key === "number" || /^\d+$/.test(String(key))
		}

		// Recursive function to set value at path
		const setRecursive = (
			current: Value | Record<string, Value> | Array<Value>,
			remainingKeys: Array<string | number>,
		): Value | Record<string, Value> | Array<Value> => {
			if (remainingKeys.length === 0) {
				return value
			}

			const [key, ...rest] = remainingKeys
			const isLastKey = rest.length === 0

			// Initialize current if null/undefined
			const initializedCurrent = current == null
				? (shouldBeArray(key) ? [] : {})
				: current

			// Handle arrays
			if (Array.isArray(initializedCurrent)) {
				const index = typeof key === "number" ? key : parseInt(String(key), 10)
				if (isNaN(index)) {
					// Key is not numeric for array, convert to object
					const obj: Record<string, Value> = initializedCurrent.reduce(
						(acc, val, i) => ({ ...acc, [i]: val }),
						{},
					)
					return {
						...obj,
						[key]: isLastKey ? value : setRecursive(obj[key], rest),
					}
				}

				// Create new array with proper length
				const extendedArray = Array(
					Math.max(initializedCurrent.length, index + 1),
				)
					.fill(undefined)
					.map((_, i) =>
						i < initializedCurrent.length ? initializedCurrent[i] : undefined
					)

				return extendedArray.map((item, i) =>
					i === index ? (isLastKey ? value : setRecursive(item, rest)) : item
				)
			}

			// Handle objects
			if (typeof initializedCurrent === "object") {
				const strKey = String(key)
				return {
					...initializedCurrent,
					[strKey]: isLastKey
						? value
						: setRecursive(initializedCurrent[strKey], rest),
				}
			}

			// Current is a primitive, need to replace with object/array
			const nextContainer = rest.length > 0 && shouldBeArray(rest[0]) ? [] : {}
			return {
				[key]: isLastKey ? value : setRecursive(nextContainer, rest),
			}
		}

		// Start the recursive update
		const startObj = obj && typeof obj === "object" ? obj : {}
		return setRecursive(startObj, keys)
	}

export default set
