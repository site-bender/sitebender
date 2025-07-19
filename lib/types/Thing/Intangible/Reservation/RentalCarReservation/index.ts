import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

export interface RentalCarReservationProps {
	/** Where a rental car can be dropped off. */
	dropoffLocation?: Place
	/** When a rental car can be dropped off. */
	dropoffTime?: DateTime
	/** Where a taxi will pick up a passenger or a rental car can be picked up. */
	pickupLocation?: Place
	/** When a taxi will pick up a passenger or a rental car can be picked up. */
	pickupTime?: DateTime
}

type RentalCarReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& RentalCarReservationProps

export default RentalCarReservation
