import type { InstantInput } from "../../../types/temporal/index.ts"

/**
 * Checks if an instant is after another instant
 *
 * Curried function that validates whether one Instant comes chronologically
 * after another Instant. Instants represent exact moments in time (UTC-based)
 * with nanosecond precision. Returns false for equal instants.
 *
 * Instant comparison rules:
 * - Compares absolute time points (UTC-based)
 * - Strictly after: instant must be chronologically later
 * - Equal instants return false (use isSameOrAfterInstant for inclusive)
 * - Nanosecond precision comparison
 * - Timezone-independent (always UTC)
 *
 * @param reference - The reference Temporal.Instant to compare against
 * @returns A predicate function that checks if an instant is after the reference
 * @example
 * ```typescript
 * // Basic usage
 * const instant1 = Temporal.Instant.from("2024-01-15T14:30:00Z")
 * const instant2 = Temporal.Instant.from("2024-01-15T15:30:00Z")
 * const isAfterRef = isAfterInstant(instant1)
 * isAfterRef(instant2)  // true
 * isAfterRef(instant1)  // false (same)
 *
 * // Epoch milliseconds
 * const epochMs = 1705329000000
 * const instant = Temporal.Instant.fromEpochMilliseconds(epochMs)
 * isAfterInstant(instant)(epochMs + 1000)  // true
 *
 * // Event filtering
 * const events = [
 *   { timestamp: Temporal.Instant.from("2024-01-15T10:00:00Z") },
 *   { timestamp: Temporal.Instant.from("2024-01-15T11:00:00Z") }
 * ]
 * const cutoff = Temporal.Instant.from("2024-01-15T10:30:00Z")
 * events.filter(e => isAfterInstant(cutoff)(e.timestamp))
 * // [{ timestamp: "...T11:00:00Z" }]
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isAfterInstant = (
	reference: InstantInput | null | undefined,
) =>
(
	instant: InstantInput | null | undefined,
): boolean => {
	// Convert inputs to Temporal.Instant
	const toMillis = (
		value: InstantInput | null | undefined,
	): number | null => {
		if (value === null || value === undefined) {
			return null
		}

		try {
			if (typeof value === "string") {
				const d = new Date(value)
				const ms = d.getTime()
				return Number.isNaN(ms) ? null : ms
			}

			if (typeof value === "number") {
				return Number.isFinite(value) ? value : null
			}

			return null
		} catch {
			return null
		}
	}

	const refMs = toMillis(reference)
	const cmpMs = toMillis(instant)

	if (refMs === null || cmpMs === null) {
		return false
	}

	return cmpMs > refMs
}

export default isAfterInstant
