import type { Ok } from "../../../types/fp/result/index.ts"

const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")

//++ Creates an Ok result with enhanced debugging output
export default function okWithInspect<T>(value: T): Ok<T> & {
	[inspectSymbol]: () => string
} {
	const result = {
		_tag: "Ok" as const,
		value,
		[inspectSymbol]() {
			return `Ok(${JSON.stringify(value)})`
		},
	}

	return result as Ok<T> & { [inspectSymbol]: () => string }
}

//?? [EXAMPLE]
// const result = okWithInspect({ id: 1, name: "Alice" })
// console.log(result)  // Shows formatted output in console
