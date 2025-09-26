import type { Value } from "../../../types/index.ts"

import isFunction from "../../validation/isFunction/index.ts"

//++ Returns a new array of specified length using the value or function provided
export default function from(length: number) {
	return function arrayOfLength<T>(
		value: T | ((v: Value, i: number) => T),
	): Array<T> {
		return isFunction(value)
			? Array.from({ length }, value as () => T)
			: Array.from({ length }, () => (value as T))
	}
}

//?? [EXAMPLE] `from(3)("x")                        // ["x", "x", "x"]`
//?? [EXAMPLE] `from(4)(0)                          // [0, 0, 0, 0]`
//?? [EXAMPLE] `from(5)((_, i) => i)                // [0, 1, 2, 3, 4]`
//?? [EXAMPLE] `from(3)((_, i) => i * 2)            // [0, 2, 4]`
//?? [EXAMPLE] `from(3)({ name: "default" })        // [{ name: "default" }, { name: "default" }, { name: "default" }]`
//?? [EXAMPLE] `from(3)((_, i) => ({ id: i }))      // [{ id: 0 }, { id: 1 }, { id: 2 }]`
