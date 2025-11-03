//++ Returns the logical complement of a predicate function, creating a function that returns the opposite boolean result
const complement = <T extends ReadonlyArray<unknown>>(
	predicate: (...args: T) => boolean,
) =>
(...args: T): boolean => !predicate(...args)

export default complement
