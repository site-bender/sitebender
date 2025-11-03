import type { Value } from "../../../types/index.ts"

import isEmpty from "../../validation/isEmpty/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function where<
	S extends Record<string, (value: unknown) => boolean>,
>(
	spec: S,
) {
	return function checkWhere<T extends Record<string | symbol, Value>>(
		obj: T,
	): boolean {
		// Handle null/undefined
		if (!obj || typeof obj !== "object") {
			// Check if any predicates exist
			return isEmpty(spec)
		}

		// Check each predicate in the spec
		return Object.keys(spec).every(function checkPredicate(key) {
			const predicate = spec[key]
			const value = obj[key]

			// Run predicate and check result
			try {
				return predicate(value)
			} catch {
				// If predicate throws, consider it failed
				return false
			}
		})
	}
}
