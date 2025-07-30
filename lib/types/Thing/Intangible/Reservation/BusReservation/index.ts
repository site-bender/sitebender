import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface BusReservationProps {
	"@type"?: "BusReservation"}

type BusReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BusReservationProps

export default BusReservation
