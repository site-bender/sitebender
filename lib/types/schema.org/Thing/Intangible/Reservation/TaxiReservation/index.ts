import type { DateTime, Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"

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
