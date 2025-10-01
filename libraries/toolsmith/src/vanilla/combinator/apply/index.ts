//++ Calls a function with an array of arguments, spreading array elements as individual arguments
const apply = <T extends ReadonlyArray<unknown>, R>(
 	fn: (...args: T) => R,
 	args: T,
): R => fn(...args)


export default apply
