import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FoodEstablishmentReservationProps from "../../../../../types/Thing/FoodEstablishmentReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	FoodEstablishmentReservationProps,
	"FoodEstablishmentReservation",
	ExtractLevelProps<FoodEstablishmentReservationProps, ReservationProps>
>

export default function FoodEstablishmentReservation(
	{
		endTime,
		partySize,
		startTime,
		schemaType = "FoodEstablishmentReservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endTime,
				partySize,
				startTime,
				...subtypeProperties,
			}}
		/>
	)
}
