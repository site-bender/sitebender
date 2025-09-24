//++ Type guard that checks if a value is a Temporal.Instant instance (exact moment in time)
export default function isInstant(value: unknown): value is Temporal.Instant {
	try {
		return value instanceof Temporal.Instant
	} catch {
		// In case Temporal is not available
		return false
	}
}

//?? [EXAMPLE] isInstant(Temporal.Instant.from("2024-01-15T12:30:00Z")) // true
//?? [EXAMPLE] isInstant("2024-01-15T12:30:00Z") // false (string)
//?? [EXAMPLE] isInstant(Date.now()) // false (number)
//?? [EXAMPLE] isInstant(null) // false
/*??
 | [EXAMPLE]
 | const inst = Temporal.Instant.from("2024-01-15T12:30:00Z")
 | if (isInstant(inst)) {
 |   inst.toZonedDateTimeISO("America/New_York")  // TypeScript knows it's Instant
 | }
 |
 | [GOTCHA] Returns false if Temporal API is not available
 | [PRO] TypeScript type guard for safe Instant operations
 |
*/
