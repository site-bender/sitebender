import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { RentalCarReservationProps } from "../../../../../types/Thing/Intangible/Reservation/RentalCarReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	RentalCarReservationProps,
	"RentalCarReservation",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function RentalCarReservation({
	dropoffLocation,
	dropoffTime,
	pickupLocation,
	pickupTime,
	schemaType = "RentalCarReservation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dropoffLocation,
				dropoffTime,
				pickupLocation,
				pickupTime,
				...subtypeProperties,
			}}
		/>
	)
}
