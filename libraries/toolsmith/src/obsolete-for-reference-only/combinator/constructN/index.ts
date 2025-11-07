//++ Like construct but with specified arity, limiting constructor arguments to exactly n parameters
const constructN = <R>(
	n: number,
	Constructor: new (...args: unknown[]) => R,
) => {
	const wrappers: { [key: number]: (...args: unknown[]) => R } = {
		0: () => new Constructor(),
		1: (a: unknown) => new Constructor(a),
		2: (a: unknown, b: unknown) => new Constructor(a, b),
		3: (a: unknown, b: unknown, c: unknown) => new Constructor(a, b, c),
		4: (a: unknown, b: unknown, c: unknown, d: unknown) =>
			new Constructor(a, b, c, d),
		5: (a: unknown, b: unknown, c: unknown, d: unknown, e: unknown) =>
			new Constructor(a, b, c, d, e),
	}

	// For arities > 5, use a generic wrapper
	return wrappers[n] ||
		((...args: unknown[]) => new Constructor(...args.slice(0, n)))
}

export default constructN
