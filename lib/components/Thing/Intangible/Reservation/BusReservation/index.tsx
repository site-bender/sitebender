import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusReservationProps from "../../../../../types/Thing/BusReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

// BusReservation adds no properties to the Reservation schema type
export type Props = BaseComponentProps<
	BusReservationProps,
	"BusReservation",
	ExtractLevelProps<BusReservationProps, ReservationProps>
>

export default function BusReservation({
	schemaType = "BusReservation",
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
