import type { InstantInput } from "../../../types/temporal/index.ts"

import toMillis from "./toMillis/index.ts"

//++ Checks if an instant is after another instant
export default function isAfterInstant(
	reference: InstantInput | null | undefined,
) {
	return function checkIsAfterInstant(
		instant: InstantInput | null | undefined,
	): boolean {
		const refMs = toMillis(reference)
		const cmpMs = toMillis(instant)

		if (refMs === null || cmpMs === null) {
			return false
		}

		return cmpMs > refMs
	}
}

//?? [EXAMPLE] isAfterInstant("2024-01-15T14:30:00Z")("2024-01-15T15:30:00Z") // true
//?? [EXAMPLE] isAfterInstant("2024-01-15T14:30:00Z")("2024-01-15T14:30:00Z") // false (same)
//?? [EXAMPLE] isAfterInstant(1705329000000)(1705329000001) // true
//?? [EXAMPLE] isAfterInstant("2024-01-15T14:30:00Z")(null) // false
/*??
 | [EXAMPLE]
 | const epochMs = 1705329000000
 | const isAfterRef = isAfterInstant(epochMs)
 | isAfterRef(epochMs + 1000)  // true
 | isAfterRef(epochMs)         // false (same)
 | isAfterRef(epochMs - 1000)  // false
 |
 | const cutoff = "2024-01-15T10:30:00Z"
 | const events = [
 |   { timestamp: "2024-01-15T10:00:00Z" },
 |   { timestamp: "2024-01-15T11:00:00Z" },
 |   { timestamp: "2024-01-15T12:00:00Z" }
 | ]
 | events.filter(e => isAfterInstant(cutoff)(e.timestamp))
 | // [{ timestamp: "...T11:00:00Z" }, { timestamp: "...T12:00:00Z" }]
 |
 | [GOTCHA] Equal instants return false (use isSameOrAfterInstant for inclusive)
 | [GOTCHA] Timezone-independent (always UTC)
 | [GOTCHA] Invalid inputs return false (safe for chaining)
 |
*/
