import type { DateTime, Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import PlaceComponent from "../../../../../../../architect/src/define/Thing/Place/index.tsx"

export type TaxiReservationType = "TaxiReservation"

export interface TaxiReservationProps {
	"@type"?: TaxiReservationType
	partySize?:
		| Integer
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	pickupLocation?: Place | ReturnType<typeof PlaceComponent>
	pickupTime?: DateTime
}

type TaxiReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TaxiReservationProps

export default TaxiReservation
