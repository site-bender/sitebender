import type { Predicates } from "@sitebender/toolsmith/types/index.ts"

import _applyPredicate from "../_applyPredicate/index.ts"

//++ Creates a predicate that returns true if all supplied predicates return true
export default function allPass<T>(
	predicates: Predicates<T>,
) {
	return function allPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)

		/*++
		 + [EXCEPTION] .every is permitted here for performance reasons
		 + This is the ONLY place .every should be used for predicate composition
		 + Everywhere else, use this `allPass` function instead
		 */
		return predicates.every(applyPredicate)
	}
}
