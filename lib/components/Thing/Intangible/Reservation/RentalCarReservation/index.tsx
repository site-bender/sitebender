import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type RentalCarReservationProps from "../../../../../types/Thing/RentalCarReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	RentalCarReservationProps,
	"RentalCarReservation",
	ExtractLevelProps<RentalCarReservationProps, ReservationProps>
>

export default function RentalCarReservation(
	{
		dropoffLocation,
		dropoffTime,
		pickupLocation,
		pickupTime,
		schemaType = "RentalCarReservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
