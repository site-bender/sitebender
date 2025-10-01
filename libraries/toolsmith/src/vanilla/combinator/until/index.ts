//++ Calls a function repeatedly until a predicate returns true, applying the function to its own output until the condition is met
const until = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
	initial: T,
): T => predicate(initial) ? initial : until(predicate, fn, fn(initial))


export default until
