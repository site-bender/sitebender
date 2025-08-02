import type BaseProps from "../../../../../types/index.ts"
import type TrainReservationProps from "../../../../../types/Thing/Intangible/Reservation/TrainReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = TrainReservationProps & BaseProps

export default function TrainReservation({
	_type = "TrainReservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Reservation>
	)
}
