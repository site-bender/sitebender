import type BaseProps from "../../../../../types/index.ts"
import type { FlightReservation as FlightReservationProps } from "../../../../../types/index.ts"

import Reservation from "../index.tsx"

export type Props = FlightReservationProps & BaseProps

export default function FlightReservation({
	_type = "FlightReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
