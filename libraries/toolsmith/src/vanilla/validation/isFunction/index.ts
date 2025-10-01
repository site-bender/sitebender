type AnyFunction = (...args: ReadonlyArray<unknown>) => unknown

//++ Type guard that checks if a value is callable as a function
export default function isFunction(value: unknown): value is AnyFunction {
	return typeof value === "function"
}
