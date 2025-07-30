import type { DateTime, Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import PlaceComponent from "../../../../../components/Thing/Place/index.ts"

export interface TaxiReservationProps {
	"@type"?: "TaxiReservation"
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
