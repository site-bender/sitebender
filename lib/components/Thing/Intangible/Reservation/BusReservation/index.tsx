import type BaseProps from "../../../../../types/index.ts"
import type { BusReservation as BusReservationProps } from "../../../../../types/index.ts"

import Reservation from "../index.tsx"

export type Props = BusReservationProps & BaseProps

export default function BusReservation({
	_type = "BusReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
