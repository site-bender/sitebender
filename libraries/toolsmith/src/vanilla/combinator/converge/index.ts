//++ Applies multiple functions to the same arguments and combines results - the converging function receives the results of all branch functions
const converge = <T extends ReadonlyArray<unknown>, R>(
 	converger: (...results: ReadonlyArray<unknown>) => R,
 	branches: ReadonlyArray<(...args: T) => unknown>,
) =>
(...args: T): R => {
	const results = branches.map((branch) => branch(...args))
	return converger(...results)
}


export default converge
