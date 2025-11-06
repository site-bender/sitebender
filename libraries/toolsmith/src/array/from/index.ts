import type { Value } from "../../types/index.ts"

import isFunction from "../../predicates/isFunction/index.ts"

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
