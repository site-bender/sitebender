//++ Conditionally applies a function based on a predicate, returning the value unchanged if predicate is false
const when = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? fn(value) : value


export default when
