import type { Validation } from "../../../types/Validation/index.ts"

//++ Maps a function over a valid value, preserving invalid state
export default function map<A, B>(fn: (value: A) => B) {
	return function applyMap<E>(validation: Validation<E, A>): Validation<E, B> {
		if (validation._tag === "Invalid") {
			return validation
		}

		return {
			_tag: "Valid",
			value: fn(validation.value),
		}
	}
}

//?? [EXAMPLE] map((x: number) => x * 2)(valid(21)) // valid(42)
//?? [EXAMPLE] map((x: number) => x * 2)(invalid([{field: "age", messages: ["error"]}])) // invalid([{field: "age", messages: ["error"]}])
//?? [EXAMPLE] map((s: string) => s.length)(valid("hello")) // valid(5)

/*??
 | [EXAMPLE]
 | const double = (x: number) => x * 2
 | const toString = (x: number) => x.toString()
 |
 | // Mapping over valid values
 | map(double)(valid(10))  // valid(20)
 | map(toString)(valid(42))  // valid("42")
 |
 | // Mapping over invalid preserves the error
 | const error = invalid([{field: "age", messages: ["too young"]}])
 | map(double)(error)  // invalid([{field: "age", messages: ["too young"]}])
 |
 | // Chaining transformations
 | const validation = valid(5)
 | const doubled = map(double)(validation)  // valid(10)
 | const stringified = map(toString)(doubled)  // valid("10")
 |
 | [PRO] Short-circuits on Invalid, no need for null checks
 | [PRO] Preserves error information through the chain
 | [PRO] Type-safe transformations
 |
 | [GOTCHA] Only transforms Valid values, Invalid passes through unchanged
 | [GOTCHA] Use chain/flatMap if your function returns a Validation
 */
