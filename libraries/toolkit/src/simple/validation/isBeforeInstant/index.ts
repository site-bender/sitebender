import type { InstantInput } from "../../../types/temporal/index.ts"

/**
 * Checks if an instant is before another instant
 *
 * Curried function that validates whether one Instant comes chronologically
 * before another Instant. Instants represent exact moments in time (UTC-based)
 * with nanosecond precision. Returns false for equal instants, invalid inputs,
 * or conversion failures.
 *
 * Instant comparison rules:
 * - Compares absolute time points (UTC-based)
 * - Strictly before: instant must be chronologically earlier
 * - Equal instants return false (use isSameOrBeforeInstant for inclusive)
 * - Nanosecond precision comparison
 * - Timezone-independent (always UTC)
 * - Invalid inputs return false (safe for chaining)
 *
 * @param reference - The reference instant (Temporal.Instant, ISO string with Z, or epoch milliseconds)
 * @returns A predicate function that checks if an instant is before the reference
 * @example
 * ```typescript
 * // Basic usage
 * const instant1 = Temporal.Instant.from("2024-01-15T14:30:00Z")
 * const instant2 = Temporal.Instant.from("2024-01-15T13:30:00Z")
 * const isBeforeRef = isBeforeInstant(instant1)
 * isBeforeRef(instant2)  // true
 * isBeforeRef(instant1)  // false (same)
 *
 * // Epoch milliseconds
 * const epochMs = 1705329000000
 * isBeforeInstant(epochMs)(epochMs - 1000)  // true
 *
 * // ISO strings
 * isBeforeInstant("2024-01-15T14:30:00Z")("2024-01-15T13:30:00Z")  // true
 *
 * // Event filtering
 * const events = [
 *   { timestamp: Temporal.Instant.from("2024-01-15T10:00:00Z") },
 *   { timestamp: Temporal.Instant.from("2024-01-15T09:00:00Z") }
 * ]
 * const cutoff = Temporal.Instant.from("2024-01-15T10:00:00Z")
 * events.filter(e => isBeforeInstant(cutoff)(e.timestamp))
 * // [{ timestamp: "...T09:00:00Z" }]
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
const isBeforeInstant = (
	reference: InstantInput | null | undefined,
) =>
(
	instant: InstantInput | null | undefined,
): boolean => {
	// Convert inputs to Temporal.Instant
	const toInstant = (
		value: InstantInput | null | undefined,
	): Temporal.Instant | null => {
		if (value == null) {
			return null
		}

		try {
			if (value instanceof Temporal.Instant) {
				return value
			}

			if (typeof value === "string") {
				return Temporal.Instant.from(value)
			}

			if (typeof value === "number") {
				return Temporal.Instant.fromEpochMilliseconds(value)
			}

			return null
		} catch {
			return null
		}
	}

	const refInstant = toInstant(reference)
	const compareInstant = toInstant(instant)

	if (!refInstant || !compareInstant) {
		return false
	}

	try {
		return Temporal.Instant.compare(compareInstant, refInstant) < 0
	} catch {
		return false
	}
}

export default isBeforeInstant
