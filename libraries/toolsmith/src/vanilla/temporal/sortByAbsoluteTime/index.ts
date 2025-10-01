//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function sortByAbsoluteTime(timeZone: string = "UTC") {
	return function compareByAbsoluteTime(
		a:
			| Temporal.Instant
			| Temporal.ZonedDateTime
			| Temporal.PlainDateTime
			| null
			| undefined,
		b:
			| Temporal.Instant
			| Temporal.ZonedDateTime
			| Temporal.PlainDateTime
			| null
			| undefined,
	): number {
		// Handle null/undefined cases
		if (isNullish(a) && isNullish(b)) return 0
		if (isNullish(a)) return 1 // nulls sort to end
		if (isNullish(b)) return -1

		try {
			// Convert both to Instants for absolute time comparison
			let instantA: Temporal.Instant
			let instantB: Temporal.Instant

			// Convert a to Instant
			if (a instanceof Temporal.Instant) {
				instantA = a
			} else if (a instanceof Temporal.ZonedDateTime) {
				instantA = a.toInstant()
			} else if (a instanceof Temporal.PlainDateTime) {
				instantA = a.toZonedDateTime(timeZone).toInstant()
			} else {
				// Invalid type for a
				return 1
			}

			// Convert b to Instant
			if (b instanceof Temporal.Instant) {
				instantB = b
			} else if (b instanceof Temporal.ZonedDateTime) {
				instantB = b.toInstant()
			} else if (b instanceof Temporal.PlainDateTime) {
				instantB = b.toZonedDateTime(timeZone).toInstant()
			} else {
				// Invalid type for b
				return -1
			}

			// Compare instants
			return Temporal.Instant.compare(instantA, instantB)
		} catch {
			// If conversion fails, try to compare based on type precedence
			// This is a fallback that shouldn't normally be reached
			if (a instanceof Temporal.Instant && !(b instanceof Temporal.Instant)) {
				return -1
			}
			if (!(a instanceof Temporal.Instant) && b instanceof Temporal.Instant) {
				return 1
			}
			if (
				a instanceof Temporal.ZonedDateTime &&
				b instanceof Temporal.PlainDateTime
			) return -1
			if (
				a instanceof Temporal.PlainDateTime &&
				b instanceof Temporal.ZonedDateTime
			) return 1

			return 0
		}
	}
}
