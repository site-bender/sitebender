import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"
import type TaxiReservationProps from "../../../../../types/Thing/TaxiReservation/index.ts"

import Reservation from "./index.tsx"

export type Props = BaseComponentProps<
	TaxiReservationProps,
	"TaxiReservation",
	ExtractLevelProps<TaxiReservationProps, ReservationProps>
>

export default function TaxiReservation(
	{
		partySize,
		pickupLocation,
		pickupTime,
		schemaType = "TaxiReservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				partySize,
				pickupLocation,
				pickupTime,
				...subtypeProperties,
			}}
		/>
	)
}
