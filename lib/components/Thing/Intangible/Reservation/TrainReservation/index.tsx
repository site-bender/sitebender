import type BaseProps from "../../../../../types/index.ts"
import type { TrainReservation as TrainReservationProps } from "../../../../../types/index.ts"

import Reservation from "../index.tsx"

export type Props = TrainReservationProps & BaseProps

export default function TrainReservation({
	_type = "TrainReservation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
