import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type EventAttendanceModeEnumerationType =
	"EventAttendanceModeEnumeration"

export interface EventAttendanceModeEnumerationProps {
	"@type"?: EventAttendanceModeEnumerationType
}

type EventAttendanceModeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EventAttendanceModeEnumerationProps

export default EventAttendanceModeEnumeration
