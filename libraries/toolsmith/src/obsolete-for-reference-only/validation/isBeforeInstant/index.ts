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
