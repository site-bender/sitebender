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
 * // Basic usage with simple objects
 * const point = withInspect(
 *   { x: 10, y: 20 },
 *   p => `Point(${p.x}, ${p.y})`
 * )
 * 
 * console.log(point)  // Point(10, 20) instead of { x: 10, y: 20 }
 * 
 * // With ADTs like Option
 * interface Some<T> {
 *   _tag: "Some"
 *   value: T
 * }
 * 
 * interface None {
 *   _tag: "None"
 * }
 * 
 * type Option<T> = Some<T> | None
 * 
 * const some = <T>(value: T): Option<T> =>
 *   withInspect(
 *     { _tag: "Some" as const, value },
 *     opt => `Some(${JSON.stringify(opt.value)})`
 *   )
 * 
 * const none = (): Option<never> =>
 *   withInspect(
 *     { _tag: "None" as const },
 *     () => "None"
 *   )
 * 
 * console.log(some(42))        // Some(42)
 * console.log(none())          // None
 * console.log(some("hello"))   // Some("hello")
 * 
 * // With Either type
 * const left = <E>(value: E) =>
 *   withInspect(
 *     { _tag: "Left" as const, left: value },
 *     l => `Left(${JSON.stringify(l.left)})`
 *   )
 * 
 * const right = <A>(value: A) =>
 *   withInspect(
 *     { _tag: "Right" as const, right: value },
 *     r => `Right(${JSON.stringify(r.right)})`
 *   )
 * 
 * console.log(left("error"))   // Left("error")
 * console.log(right(100))      // Right(100)
 * 
 * // Custom formatting for complex types
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 * 
 * const user: User = withInspect(
 *   { id: 1, name: "Alice", email: "alice@example.com" },
 *   u => `User#${u.id}(${u.name})`
 * )
 * 
 * console.log(user)  // User#1(Alice)
 * 
 * // The property is non-enumerable
 * const obj = withInspect({ a: 1 }, () => "Custom")
 * Object.keys(obj)  // ["a"] - inspect symbol not included
 * JSON.stringify(obj)  // '{"a":1}' - inspect symbol not serialized
 * 
 * // Works with nested structures
 * const tree = withInspect(
 *   {
 *     value: 10,
 *     left: withInspect({ value: 5, left: null, right: null }, () => "Node(5)"),
 *     right: withInspect({ value: 15, left: null, right: null }, () => "Node(15)")
 *   },
 *   t => `Node(${t.value}, ${t.left}, ${t.right})`
 * )
 * 
 * console.log(tree)  // Node(10, Node(5), Node(15))
 * 
 * // Conditional formatting
 * const result = withInspect(
 *   { status: "error", message: "Not found" },
 *   r => r.status === "error" 
 *     ? `❌ Error: ${r.message}`
 *     : `✅ Success`
 * )
 * 
 * // Using with class instances (though we prefer plain objects in FP)
 * class Box<T> {
 *   constructor(public value: T) {
 *     return withInspect(this, b => `Box(${b.value})`)
 *   }
 * }
 * 
 * console.log(new Box(42))  // Box(42)
 * 
 * // Handling circular references safely
 * const circular: any = { name: "root" }
 * circular.self = circular
 * 
 * const safe = withInspect(
 *   circular,
 *   () => "CircularRef<root>"  // Avoid recursion in show function
 * )
 * ```
 * 
 * @property Non-enumerable - The inspect property won't show in iterations
 * @property One-time-mutation - Only mutates at construction time
 * @property Debugging-focused - Purely for developer experience
 */
const withInspect = <T extends object>(
	obj: T,
	show: (o: T) => string
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
		}
	)
}

export default withInspect