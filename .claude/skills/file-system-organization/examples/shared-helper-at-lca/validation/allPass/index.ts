import type { Predicates } from "@sitebender/toolsmith/types/index.ts"

import _applyPredicate from "../_applyPredicate/index.ts"

//++ Returns true if all predicates pass for the given value
export default function allPass<T>(predicates: Predicates<T>) {
	return function allPassWithPredicates(value: T): boolean {
		const applyPredicate = _applyPredicate<T>(value)

		return predicates.every(applyPredicate)
	}
}
