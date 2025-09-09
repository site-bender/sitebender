import type { InstantInput } from "../../../types/temporal/index.ts"

import toMillis from "../isAfterInstant/toMillis/index.ts"

//++ Checks if an instant is before another instant
export default function isBeforeInstant(
	reference: InstantInput | null | undefined,
) {
	return function checkIsBeforeInstant(
		instant: InstantInput | null | undefined,
	): boolean {
		const refMs = toMillis(reference)
		const cmpMs = toMillis(instant)

		if (refMs === null || cmpMs === null) {
			return false
		}

		return cmpMs < refMs
	}
}

//?? [EXAMPLE] isBeforeInstant("2024-01-15T14:30:00Z")("2024-01-15T13:30:00Z") // true
//?? [EXAMPLE] isBeforeInstant("2024-01-15T14:30:00Z")("2024-01-15T14:30:00Z") // false (same)
//?? [EXAMPLE] isBeforeInstant(1705329000000)(1705329000000 - 1000) // true
//?? [EXAMPLE] isBeforeInstant("2024-01-15T14:30:00Z")(null) // false
/*??
 * [EXAMPLE]
 * const epochMs = 1705329000000
 * const isBeforeRef = isBeforeInstant(epochMs)
 * isBeforeRef(epochMs - 1000)  // true
 * isBeforeRef(epochMs)         // false (same)
 * isBeforeRef(epochMs + 1000)  // false
 *
 * const cutoff = "2024-01-15T10:30:00Z"
 * const events = [
 *   { timestamp: "2024-01-15T09:00:00Z" },
 *   { timestamp: "2024-01-15T10:00:00Z" },
 *   { timestamp: "2024-01-15T11:00:00Z" }
 * ]
 * events.filter(e => isBeforeInstant(cutoff)(e.timestamp))
 * // [{ timestamp: "...T09:00:00Z" }, { timestamp: "...T10:00:00Z" }]
 *
 * [GOTCHA] Equal instants return false (use isSameOrBeforeInstant for inclusive)
 * [GOTCHA] Timezone-independent (always UTC)
 * [GOTCHA] Invalid inputs return false (safe for chaining)
 */
