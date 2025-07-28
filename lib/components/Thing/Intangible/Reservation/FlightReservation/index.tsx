import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { FlightReservationProps } from "../../../../../types/Thing/Intangible/Reservation/FlightReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	FlightReservationProps,
	"FlightReservation",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function FlightReservation({
	boardingGroup,
	passengerPriorityStatus,
	passengerSequenceNumber,
	securityScreening,
	schemaType = "FlightReservation",
	subtypeProperties = {},
	...props
}): Props {
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
