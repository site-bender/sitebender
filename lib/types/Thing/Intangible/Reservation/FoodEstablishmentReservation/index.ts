import type { DateTime, Integer, Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

export interface FoodEstablishmentReservationProps {
	endTime?: DateTime | Time
	partySize?: Integer | QuantitativeValue
	startTime?: DateTime | Time
}

type FoodEstablishmentReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& FoodEstablishmentReservationProps

export default FoodEstablishmentReservation
