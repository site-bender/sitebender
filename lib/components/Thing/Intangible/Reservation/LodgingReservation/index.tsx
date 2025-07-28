import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { LodgingReservationProps } from "../../../../../types/Thing/Intangible/Reservation/LodgingReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	LodgingReservationProps,
	"LodgingReservation",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function LodgingReservation({
	checkinTime,
	checkoutTime,
	lodgingUnitDescription,
	lodgingUnitType,
	numAdults,
	numChildren,
	schemaType = "LodgingReservation",
	subtypeProperties = {},
	...props
}): Props {
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
