import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export type EventReservationType = "EventReservation"

export interface EventReservationProps {
	"@type"?: EventReservationType
}

type EventReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& EventReservationProps

export default EventReservation
