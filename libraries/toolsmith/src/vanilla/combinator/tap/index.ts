//++ Runs a side effect function on a value and returns the value, useful for debugging, logging, or performing side effects in a pipeline
const tap = <T>(fn: (value: T) => unknown) => (value: T): T => {
	fn(value)
	return value
}


export default tap
