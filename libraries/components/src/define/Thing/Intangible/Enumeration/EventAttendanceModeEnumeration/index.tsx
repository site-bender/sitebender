import type BaseProps from "../../../../../../types/index.ts"
import type { EventAttendanceModeEnumeration as EventAttendanceModeEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EventAttendanceModeEnumerationProps & BaseProps

export default function EventAttendanceModeEnumeration({
	_type = "EventAttendanceModeEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
