//++ The opposite of when - applies function when predicate is false, returning the value unchanged if predicate is true
const unless = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? value : fn(value)


export default unless
