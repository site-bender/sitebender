import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type EventAttendanceModeEnumerationProps from "../../../../../types/Thing/EventAttendanceModeEnumeration/index.ts"

import Enumeration from "../index.tsx"

// EventAttendanceModeEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	EventAttendanceModeEnumerationProps,
	"EventAttendanceModeEnumeration",
	ExtractLevelProps<EventAttendanceModeEnumerationProps, EnumerationProps>
>

export default function EventAttendanceModeEnumeration({
	schemaType = "EventAttendanceModeEnumeration",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
