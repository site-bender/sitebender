/**
 * Attaches a custom inspection method to an object for better debugging output
 *
 * Adds a non-enumerable Symbol.for("nodejs.util.inspect.custom") property
 * to an object, which Node.js and Deno use to customize console.log output.
 * This provides better developer experience when logging ADTs (Algebraic Data
 * Types) like Either, Option, etc., while maintaining functional programming
 * principles by treating the mutation as a one-time construction detail.
 *
 * @param obj - The object to enhance with custom inspection
 * @param show - Function that returns the string representation
 * @returns The same object with inspection method attached
 * @example
 * ```typescript
 * // Basic usage
 * const point = withInspect(
 *   { x: 10, y: 20 },
 *   p => `Point(${p.x}, ${p.y})`
 * )
 * console.log(point)  // Point(10, 20) instead of { x: 10, y: 20 }
 *
 * // With ADTs like Option
 * const some = <T>(value: T) =>
 *   withInspect(
 *     { _tag: "Some" as const, value },
 *     opt => `Some(${JSON.stringify(opt.value)})`
 *   )
 *
 * const none = () =>
 *   withInspect(
 *     { _tag: "None" as const },
 *     () => "None"
 *   )
 *
 * console.log(some(42))  // Some(42)
 * console.log(none())    // None
 *
 * // With Either type
 * const left = <E>(value: E) =>
 *   withInspect(
 *     { _tag: "Left" as const, left: value },
 *     l => `Left(${JSON.stringify(l.left)})`
 *   )
 *
 * console.log(left("error"))  // Left("error")
 *
 * // The property is non-enumerable
 * const obj = withInspect({ a: 1 }, () => "Custom")
 * Object.keys(obj)     // ["a"] - inspect symbol not included
 * JSON.stringify(obj)  // '{"a":1}' - inspect symbol not serialized
 * ```
 *
 * @impure - Mutates object (though only at construction time)
 * @curried
 */
const withInspect = <T extends object>(
	obj: T,
	show: (o: T) => string,
): T => {
	return Object.defineProperty(
		obj,
		Symbol.for("nodejs.util.inspect.custom"),
		{
			value() {
				return show(obj)
			},
			enumerable: false,
			configurable: true,
			writable: false,
		},
	)
}

export default withInspect
