import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { FoodEstablishmentReservationProps } from "../../../../../types/Thing/Intangible/Reservation/FoodEstablishmentReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	FoodEstablishmentReservationProps,
	"FoodEstablishmentReservation",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function FoodEstablishmentReservation({
	endTime,
	partySize,
	startTime,
	schemaType = "FoodEstablishmentReservation",
	subtypeProperties = {},
	...props
}): Props {
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
