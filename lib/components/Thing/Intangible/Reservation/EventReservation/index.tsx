import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EventReservationProps from "../../../../../types/Thing/EventReservation/index.ts"
import type ReservationProps from "../../../../../types/Thing/Reservation/index.ts"

import Reservation from "../index.tsx"

// EventReservation adds no properties to the Reservation schema type
export type Props = BaseComponentProps<
	EventReservationProps,
	"EventReservation",
	ExtractLevelProps<EventReservationProps, ReservationProps>
>

export default function EventReservation({
	schemaType = "EventReservation",
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
