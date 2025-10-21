import type { Predicates } from "@sitebender/toolsmith/types/index.ts"

import _applyPredicate from "@sitebender/toolsmith/validation/_applyPredicate/index.ts"

//++ Creates a predicate that returns true if any supplied predicate returns true
export default function anyPass<T>(
	predicates: Predicates<T>,
) {
	return function anyPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)

		/*++
		 + [EXCEPTION] .some is permitted here for performance reasons
		 + This is the ONLY place .some should be used for predicate composition
		 + Everywhere else, use this `anyPass` function instead
		 */
		return predicates.some(applyPredicate)
	}
}
