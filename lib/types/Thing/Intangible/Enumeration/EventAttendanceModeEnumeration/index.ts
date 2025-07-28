import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import EventAttendanceModeEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/EventAttendanceModeEnumeration/index.tsx"

export interface EventAttendanceModeEnumerationProps {
}

type EventAttendanceModeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& EventAttendanceModeEnumerationProps

export default EventAttendanceModeEnumeration
