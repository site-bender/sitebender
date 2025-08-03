import type BaseProps from "../../../../../types/index.ts"
import type { LodgingReservation as LodgingReservationProps } from "../../../../../types/index.ts"

import Reservation from "../index.tsx"

export type Props = LodgingReservationProps & BaseProps

export default function LodgingReservation({
	_type = "LodgingReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
