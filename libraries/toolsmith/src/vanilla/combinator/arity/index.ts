//++ Wraps a function to report a specific arity, forcing it to accept exactly n arguments and ignoring extras
const arity = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
	// Create a wrapper with the exact arity requested
	const wrappers: { [key: number]: (...args: ReadonlyArray<unknown>) => R } = {
		0: () => fn(),
		1: (a: unknown) => fn(a),
		2: (a: unknown, b: unknown) => fn(a, b),
		3: (a: unknown, b: unknown, c: unknown) => fn(a, b, c),
		4: (a: unknown, b: unknown, c: unknown, d: unknown) => fn(a, b, c, d),
		5: (a: unknown, b: unknown, c: unknown, d: unknown, e: unknown) =>
			fn(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	return wrappers[n] ||
		((...args: ReadonlyArray<unknown>) => fn(...args.slice(0, n)))
}

export default arity
