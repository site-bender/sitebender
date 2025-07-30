import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface EventReservationProps {
	"@type"?: "EventReservation"}

type EventReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& EventReservationProps

export default EventReservation
