import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const getTimeZone = (
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): string | null => {
	if (isNullish(zonedDateTime)) {
		return null
	}

	if (!(zonedDateTime instanceof Temporal.ZonedDateTime)) {
		return null
	}

	try {
		return zonedDateTime.timeZoneId
	} catch {
		return null
	}
}

export default getTimeZone
