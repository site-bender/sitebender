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
