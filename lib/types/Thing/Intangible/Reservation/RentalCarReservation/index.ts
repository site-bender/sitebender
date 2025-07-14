import { DateTime } from "../../../../DataType/index.ts"
import Place from "../../../Place/index.ts"
import Reservation from "../index.ts"

export default interface RentalCarReservation extends Reservation {
	/** Where a rental car can be dropped off. */
	dropoffLocation?: Place
	/** When a rental car can be dropped off. */
	dropoffTime?: DateTime
	/** Where a taxi will pick up a passenger or a rental car can be picked up. */
	pickupLocation?: Place
	/** When a taxi will pick up a passenger or a rental car can be picked up. */
	pickupTime?: DateTime
}
