import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface BoatReservationProps {}

type BoatReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BoatReservationProps

export default BoatReservation
