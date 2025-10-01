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
