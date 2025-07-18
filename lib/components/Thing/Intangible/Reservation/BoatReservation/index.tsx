import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BoatReservationProps from "../../../../../types/Thing/BoatReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

// BoatReservation adds no properties to the Reservation schema type
export type Props = BaseComponentProps<
	BoatReservationProps,
	"BoatReservation",
	ExtractLevelProps<BoatReservationProps, ReservationProps>
>

export default function BoatReservation({
	schemaType = "BoatReservation",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Reservation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
