import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type Place from "../../../Place/index.ts"

export interface RentalCarReservationProps {
	dropoffLocation?: Place
	dropoffTime?: DateTime
	pickupLocation?: Place
	pickupTime?: DateTime
}

type RentalCarReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& RentalCarReservationProps

export default RentalCarReservation
