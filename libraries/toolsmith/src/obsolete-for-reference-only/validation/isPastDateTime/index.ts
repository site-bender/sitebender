import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isPastDateTime(
	value: DateTimeInput | null | undefined,
): boolean {
	const dateTime = toPlainDateTime(value)

	if (!dateTime) {
		return false
	}

	try {
		const now = Temporal.Now.plainDateTimeISO()
		return Temporal.PlainDateTime.compare(dateTime, now) < 0
	} catch {
		return false
	}
}
