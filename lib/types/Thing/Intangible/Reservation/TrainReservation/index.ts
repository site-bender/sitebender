import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import TrainReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/TrainReservation/index.tsx"

export interface TrainReservationProps {
}

type TrainReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TrainReservationProps

export default TrainReservation
