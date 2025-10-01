//++ Wraps a function to catch errors and call an error handler, providing a functional way to handle exceptions
// deno-lint-ignore no-explicit-any
const tryCatch = <T extends ReadonlyArray<any>, R, E>(
	tryFn: (...args: T) => R,
	catchFn: (error: unknown, ...args: T) => E,
) =>
(...args: T): R | E => {
	try {
		return tryFn(...args)
	} catch (error) {
		return catchFn(error, ...args)
	}
}


export default tryCatch
