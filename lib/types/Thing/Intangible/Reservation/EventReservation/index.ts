import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import EventReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/EventReservation/index.tsx"

export interface EventReservationProps {
}

type EventReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& EventReservationProps

export default EventReservation
