import type { Predicates } from "@sitebender/toolsmith/types/index.ts"

import _applyPredicate from "../_applyPredicate/index.ts"

//++ Returns true if any predicate passes for the given value
export default function anyPass<T>(predicates: Predicates<T>) {
	return function anyPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)

		return predicates.some(applyPredicate)
	}
}
