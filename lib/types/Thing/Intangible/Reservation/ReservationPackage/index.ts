import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Reservation from "../index.ts"
import type { ReservationProps } from "../index.ts"

import ReservationComponent from "../../../../../components/Thing/Intangible/Reservation/index.ts"

export interface ReservationPackageProps {
	subReservation?: Reservation | ReturnType<typeof ReservationComponent>
}

type ReservationPackage =
	& Thing
	& IntangibleProps
	& ReservationProps
	& ReservationPackageProps

export default ReservationPackage
