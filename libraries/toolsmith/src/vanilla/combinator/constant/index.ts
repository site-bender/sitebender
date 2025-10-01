//++ Returns a function that always returns the given value, ignoring all arguments
const constant = <T>(value: T) => (..._args: ReadonlyArray<unknown>): T => value


export default constant
