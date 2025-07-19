// BusReservation extends Reservation but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BusReservationProps {}

type BusReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BusReservationProps

export default BusReservation
