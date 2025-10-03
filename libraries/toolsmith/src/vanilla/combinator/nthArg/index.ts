//++ Returns a function that returns its nth argument, useful for selecting specific arguments in functional pipelines
const nthArg = (n: number) => (...args: ReadonlyArray<unknown>): unknown => {
	if (n < 0) {
		// Negative index - count from end
		return args[args.length + n]
	}
	return args[n]
}

export default nthArg
