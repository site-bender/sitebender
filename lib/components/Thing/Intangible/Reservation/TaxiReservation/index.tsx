import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { ReservationProps } from "../../../../../types/Thing/Intangible/Reservation/index.ts"
import type { TaxiReservationProps } from "../../../../../types/Thing/Intangible/Reservation/TaxiReservation/index.ts"

import Reservation from "../index.tsx"

export type Props = BaseComponentProps<
	TaxiReservationProps,
	"TaxiReservation",
	ExtractLevelProps<ThingProps, IntangibleProps, ReservationProps>
>

export default function TaxiReservation({
	partySize,
	pickupLocation,
	pickupTime,
	schemaType = "TaxiReservation",
	subtypeProperties = {},
	...props
}): Props {
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
