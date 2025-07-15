import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LodgingReservationProps from "../../../../../types/Thing/LodgingReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "./index.tsx"

export type Props = BaseComponentProps<
	LodgingReservationProps,
	"LodgingReservation",
	ExtractLevelProps<LodgingReservationProps, ReservationProps>
>

export default function LodgingReservation(
	{
		checkinTime,
		checkoutTime,
		lodgingUnitDescription,
		lodgingUnitType,
		numAdults,
		numChildren,
		schemaType = "LodgingReservation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				checkinTime,
				checkoutTime,
				lodgingUnitDescription,
				lodgingUnitType,
				numAdults,
				numChildren,
				...subtypeProperties,
			}}
		/>
	)
}
