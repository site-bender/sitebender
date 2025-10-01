import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const serializeZonedDateTime = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): {
	instant: string
	timeZone: string
	calendar: string
	offset: string
	plainDateTime: string
	epochNanoseconds: string
} | null => {
	if (isNullish(zonedDateTime)) {
		return null
	}

	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}

	try {
		return {
			// ISO 8601 instant string (UTC) - universally compatible
			instant: zonedDateTime.toInstant().toString(),

			// Timezone identifier for reconstruction
			timeZone: zonedDateTime.timeZoneId,

			// Calendar system
			calendar: zonedDateTime.calendarId,

			// Current offset at this specific time (handles DST)
			offset: zonedDateTime.offset,

			// Local date/time representation
			plainDateTime: zonedDateTime.toPlainDateTime().toString(),

			// Nanoseconds since epoch for precise reconstruction
			epochNanoseconds: zonedDateTime.epochNanoseconds.toString(),
		}
	} catch {
		return null
	}
}

export default serializeZonedDateTime
