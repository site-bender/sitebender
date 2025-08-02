import type BaseProps from "../../../../../types/index.ts"
import type LodgingReservationProps from "../../../../../types/Thing/Intangible/Reservation/LodgingReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = LodgingReservationProps & BaseProps

export default function LodgingReservation({
	checkinTime,
	checkoutTime,
	lodgingUnitDescription,
	lodgingUnitType,
	numAdults,
	numChildren,
	_type = "LodgingReservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				checkinTime,
				checkoutTime,
				lodgingUnitDescription,
				lodgingUnitType,
				numAdults,
				numChildren,
				...subtypeProperties,
			}}
		>
			{children}
		</Reservation>
	)
}
