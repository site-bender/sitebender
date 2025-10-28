import type { DateTime, Integer, Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type FoodEstablishmentReservationType = "FoodEstablishmentReservation"

export interface FoodEstablishmentReservationProps {
	"@type"?: FoodEstablishmentReservationType
	endTime?: DateTime | Time
	partySize?:
		| Integer
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	startTime?: DateTime | Time
}

type FoodEstablishmentReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& FoodEstablishmentReservationProps

export default FoodEstablishmentReservation
