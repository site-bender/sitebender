import type BaseProps from "../../../../../types/index.ts"
import type FlightReservationProps from "../../../../../types/Thing/Intangible/Reservation/FlightReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = FlightReservationProps & BaseProps

export default function FlightReservation({
	boardingGroup,
	passengerPriorityStatus,
	passengerSequenceNumber,
	securityScreening,
	_type = "FlightReservation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Reservation
			{...props}
			_type={_type}
			subtypeProperties={{
				boardingGroup,
				passengerPriorityStatus,
				passengerSequenceNumber,
				securityScreening,
				...subtypeProperties,
			}}
		>{children}</Reservation>
	)
}
