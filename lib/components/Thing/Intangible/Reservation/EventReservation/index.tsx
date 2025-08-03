import type BaseProps from "../../../../../types/index.ts"
import type { EventReservation as EventReservationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EventReservationProps & BaseProps

export default function EventReservation({
	_type = "EventReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
