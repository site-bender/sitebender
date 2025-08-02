import type BaseProps from "../../../../../types/index.ts"
import type TaxiReservationProps from "../../../../../types/Thing/Intangible/Reservation/TaxiReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = TaxiReservationProps & BaseProps

export default function TaxiReservation({
	partySize,
	pickupLocation,
	pickupTime,
	_type = "TaxiReservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				partySize,
				pickupLocation,
				pickupTime,
				...subtypeProperties,
			}}
		>
			{children}
		</Reservation>
	)
}
