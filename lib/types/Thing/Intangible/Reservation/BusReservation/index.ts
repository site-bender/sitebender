import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import BusReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/BusReservation/index.tsx"

export interface BusReservationProps {
}

type BusReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& BusReservationProps

export default BusReservation
