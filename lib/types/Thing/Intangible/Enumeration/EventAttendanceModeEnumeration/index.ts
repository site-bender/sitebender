import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface EventAttendanceModeEnumerationProps {
	"@type"?: "EventAttendanceModeEnumeration"}

type EventAttendanceModeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EventAttendanceModeEnumerationProps

export default EventAttendanceModeEnumeration
