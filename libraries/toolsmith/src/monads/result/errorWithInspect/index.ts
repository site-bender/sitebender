import type { Error } from "../../../types/fp/result/index.ts"

//++ [EXCEPTION] Symbol.for() permitted in Toolsmith for performance - provides Node.js custom inspect symbol
const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")

//++ Creates an Error result with enhanced debugging output
export default function errorWithInspect<E>(err: E): Error<E> & {
	[inspectSymbol]: () => string
} {
	const result = {
		_tag: "Error" as const,
		error: err,
		[inspectSymbol]() {
			return `Error(${JSON.stringify(err)})`
		},
	}

	return result as Error<E> & { [inspectSymbol]: () => string }
}

// const result = errorWithInspect(new Error("Something went wrong"))
// console.log(result)  // Shows formatted error output in console
