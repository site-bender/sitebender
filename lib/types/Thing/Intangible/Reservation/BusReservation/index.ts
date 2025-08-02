import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export type BusReservationType = "BusReservation"

export interface BusReservationProps {
	"@type"?: BusReservationType
}

type BusReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BusReservationProps

export default BusReservation
