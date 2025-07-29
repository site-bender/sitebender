import type BaseProps from "../../../../../types/index.ts"
import type EventAttendanceModeEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/EventAttendanceModeEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = EventAttendanceModeEnumerationProps & BaseProps

export default function EventAttendanceModeEnumeration({
	_type = "EventAttendanceModeEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
