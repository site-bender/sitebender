//++ Attaches a custom inspection method to an object for better debugging output
export default function withInspect<T extends object>(
	obj: T,
	show: (o: T) => string,
): T {
	//-- [WORKAROUND] Mutates object to add Symbol - justified for developer experience
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

/*??
 | [EXAMPLE]
 | const point = withInspect({ x: 10, y: 20 }, p => `Point(${p.x}, ${p.y})`)
 | console.log(point) // Point(10, 20) instead of { x: 10, y: 20 }
 |
 | [EXAMPLE]
 | const some = <T>(value: T) => withInspect({ _tag: "Some", value }, opt => `Some(${JSON.stringify(opt.value)})`)
 | console.log(some(42)) // Some(42)
 |
 | [GOTCHA] The inspection property is non-enumerable and won't appear in Object.keys() or JSON.stringify()
 |
*/
