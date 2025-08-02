import type BaseProps from "../../../../../types/index.ts"
import type FoodEstablishmentReservationProps from "../../../../../types/Thing/Intangible/Reservation/FoodEstablishmentReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = FoodEstablishmentReservationProps & BaseProps

export default function FoodEstablishmentReservation({
	endTime,
	partySize,
	startTime,
	_type = "FoodEstablishmentReservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				endTime,
				partySize,
				startTime,
				...subtypeProperties,
			}}
		>
			{children}
		</Reservation>
	)
}
