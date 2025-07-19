import type { DateTime, Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

export interface TaxiReservationProps {
	/** Number of people the reservation should accommodate. */
	partySize?: Integer | QuantitativeValue
	/** Where a taxi will pick up a passenger or a rental car can be picked up. */
	pickupLocation?: Place
	/** When a taxi will pick up a passenger or a rental car can be picked up. */
	pickupTime?: DateTime
}

type TaxiReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TaxiReservationProps

export default TaxiReservation
