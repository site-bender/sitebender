import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FlightReservationProps from "../../../../../types/Thing/FlightReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	FlightReservationProps,
	"FlightReservation",
	ExtractLevelProps<FlightReservationProps, ReservationProps>
>

export default function FlightReservation(
	{
		boardingGroup,
		passengerPriorityStatus,
		passengerSequenceNumber,
		securityScreening,
		schemaType = "FlightReservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				boardingGroup,
				passengerPriorityStatus,
				passengerSequenceNumber,
				securityScreening,
				...subtypeProperties,
			}}
		/>
	)
}
