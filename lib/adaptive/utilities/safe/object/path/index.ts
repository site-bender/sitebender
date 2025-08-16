import type { Value } from "../../../../types/index.ts"
import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"

export class PathError extends Error {
	constructor(message: string, public readonly path: string | Array<string | number>) {
		super(message)
		this.name = "PathError"
	}
}

/**
 * Safely retrieves a nested value from an object using a path
 * 
 * Returns Either<PathError, Value> instead of Value | undefined.
 * This ensures explicit error handling and composability with other
 * Either-based functions.
 * 
 * @curried (pathInput) => (obj) => Either<PathError, Value>
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to traverse
 * @returns Either with PathError on Left or value on Right
 * @example
 * ```typescript
 * // Success cases
 * pathSafe("a.b.c")({ a: { b: { c: "value" } } })
 *   .fold(
 *     err => console.error(err.message),
 *     val => console.log(val)  // "value"
 *   )
 * 
 * // Error cases with detailed information
 * pathSafe("a.b.missing")({ a: { b: {} } })
 *   .fold(
 *     err => console.error(err.message), // "Path 'a.b.missing' not found"
 *     val => console.log(val)
 *   )
 * 
 * // Composable with other Either functions
 * import { pipeEither } from "../../../types/either/pipeline"
 * 
 * const process = pipeEither(
 *   pathSafe("user.id"),
 *   map(id => id * 2),
 *   map(id => ({ doubledId: id }))
 * )
 * 
 * // Array path notation
 * pathSafe(["user", "settings", "theme"])({ user: { settings: { theme: "dark" } } })
 *   // Right<"dark">
 * 
 * // Handles null/undefined gracefully
 * pathSafe("any.path")(null)
 *   // Left<PathError: "Cannot access path 'any.path' on null or undefined">
 * 
 * // Works with arrays
 * pathSafe("items.0.name")({ items: [{ name: "First" }] })
 *   // Right<"First">
 * ```
 * @property Safe - Returns Either instead of throwing or returning undefined
 * @property Detailed errors - PathError includes path and descriptive message
 * @property Composable - Works seamlessly with Either pipeline functions
 */
const pathSafe = (pathInput: string | Array<string | number>) => 
(obj: Value): Either<PathError, Value> => {
	// Handle null/undefined object
	if (obj == null) {
		return left(new PathError(
			`Cannot access path '${String(pathInput)}' on null or undefined`,
			pathInput
		))
	}
	
	// Convert string path to array
	const keys = typeof pathInput === "string" 
		? (pathInput === "" ? [] : pathInput.split("."))
		: pathInput
	
	// Empty path returns the object itself
	if (keys.length === 0) return right(obj)
	
	// Traverse the path
	let current: any = obj
	const traversedPath: Array<string | number> = []
	
	for (const key of keys) {
		traversedPath.push(key)
		
		// Safety check for null/undefined
		if (current == null) {
			return left(new PathError(
				`Path '${traversedPath.join(".")}' not found - value is ${current === null ? 'null' : 'undefined'}`,
				pathInput
			))
		}
		
		// Handle different object types
		if (typeof current === "object") {
			if (Array.isArray(current)) {
				// For arrays, only allow numeric indices
				const index = typeof key === "number" ? key : parseInt(key as string, 10)
				if (isNaN(index) || index < 0 || index >= current.length) {
					return left(new PathError(
						`Invalid array index '${key}' at path '${traversedPath.join(".")}'`,
						pathInput
					))
				}
				current = current[index]
			} else if (current instanceof Map) {
				// For Maps, check if key exists
				if (!current.has(key)) {
					return left(new PathError(
						`Key '${String(key)}' not found in Map at path '${traversedPath.slice(0, -1).join(".")}'`,
						pathInput
					))
				}
				current = current.get(key)
			} else if (current instanceof Set) {
				// Sets don't have indexed access
				return left(new PathError(
					`Cannot access property '${String(key)}' on Set at path '${traversedPath.slice(0, -1).join(".")}'`,
					pathInput
				))
			} else {
				// For plain objects, use hasOwnProperty to avoid prototype pollution
				const strKey = String(key)
				if (!Object.prototype.hasOwnProperty.call(current, strKey)) {
					return left(new PathError(
						`Property '${strKey}' not found at path '${traversedPath.join(".")}'`,
						pathInput
					))
				}
				current = current[strKey]
			}
		} else {
			// Trying to traverse through a primitive
			return left(new PathError(
				`Cannot access property '${String(key)}' on ${typeof current} at path '${traversedPath.slice(0, -1).join(".")}'`,
				pathInput
			))
		}
	}
	
	return right(current)
}

export default pathSafe