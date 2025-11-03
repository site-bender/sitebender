//++ Creates a function that accepts exactly n arguments (alias for arity with different naming convention)
const nAry = <R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => {
	// Create wrappers for common arities for better performance
	const wrappers: { [key: number]: (...args: ReadonlyArray<unknown>) => R } = {
		0: () => fn(),
		1: (a: unknown) => fn(a),
		2: (a: unknown, b: unknown) => fn(a, b),
		3: (a: unknown, b: unknown, c: unknown) => fn(a, b, c),
		4: (a: unknown, b: unknown, c: unknown, d: unknown) => fn(a, b, c, d),
		5: (
			a: unknown,
			b: unknown,
			c: unknown,
			d: unknown,
			e: unknown,
		) => fn(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	return wrappers[n] ||
		((...args: ReadonlyArray<unknown>) => fn(...args.slice(0, n)))
}

export default nAry
