import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Reservation from "../index.ts"
import type { ReservationProps } from "../index.ts"

export interface ReservationPackageProps {
	/** The individual reservations included in the package. Typically a repeated property. */
	subReservation?: Reservation
}

type ReservationPackage =
	& Thing
	& IntangibleProps
	& ReservationProps
	& ReservationPackageProps

export default ReservationPackage
