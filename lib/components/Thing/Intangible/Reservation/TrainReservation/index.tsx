import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"
import type TrainReservationProps from "../../../../../types/Thing/TrainReservation/index.ts"

import Reservation from "./index.tsx"

// TrainReservation adds no properties to the Reservation schema type
export type Props = BaseComponentProps<
	TrainReservationProps,
	"TrainReservation",
	ExtractLevelProps<TrainReservationProps, ReservationProps>
>

export default function TrainReservation({
	schemaType = "TrainReservation",
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
