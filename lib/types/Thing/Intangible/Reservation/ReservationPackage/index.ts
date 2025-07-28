import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type Reservation from "../index.ts"

import ReservationPackageComponent from "../../../../../../components/Thing/Intangible/Reservation/ReservationPackage/index.tsx"

export interface ReservationPackageProps {
	subReservation?: Reservation
}

type ReservationPackage =
	& Thing
	& IntangibleProps
	& ReservationProps
	& ReservationPackageProps

export default ReservationPackage
