import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface TrainReservationProps {
	"@type"?: "TrainReservation"}

type TrainReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TrainReservationProps

export default TrainReservation
