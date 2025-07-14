import { DateTime, Integer } from "../../../../DataType/index.ts"
import Place from "../../../Place/index.ts"
import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Reservation from "../index.ts"

export default interface TaxiReservation extends Reservation {
	/** Number of people the reservation should accommodate. */
	partySize?: Integer | QuantitativeValue
	/** Where a taxi will pick up a passenger or a rental car can be picked up. */
	pickupLocation?: Place
	/** When a taxi will pick up a passenger or a rental car can be picked up. */
	pickupTime?: DateTime
}
