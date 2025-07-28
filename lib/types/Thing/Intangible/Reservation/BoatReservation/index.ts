import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import BoatReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/BoatReservation/index.tsx"

export interface BoatReservationProps {
}

type BoatReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BoatReservationProps

export default BoatReservation
