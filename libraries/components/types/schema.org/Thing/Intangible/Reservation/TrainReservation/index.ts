import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export type TrainReservationType = "TrainReservation"

export interface TrainReservationProps {
	"@type"?: TrainReservationType
}

type TrainReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TrainReservationProps

export default TrainReservation
