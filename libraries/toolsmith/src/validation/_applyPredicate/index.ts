import type { Predicate } from "../../types/index.ts"

//++ Applies a predicate function to a value and returns a boolean
export default function _applyPredicate<T>(value: T) {
	return function applyPredicateWithValue(predicate: Predicate<T>) {
		return predicate(value)
	}
}
