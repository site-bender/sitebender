import type { Predicate } from "@sitebender/toolsmith/types/index.ts"

//++ Private helper that applies a predicate to a value (used by multiple functions)
export default function _applyPredicate<T>(value: T) {
	return function applyPredicateToValue(predicate: Predicate<T>): boolean {
		return predicate(value)
	}
}
