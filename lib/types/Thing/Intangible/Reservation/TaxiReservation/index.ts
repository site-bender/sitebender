import type { DateTime, Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type Place from "../../../Place/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

import TaxiReservationComponent from "../../../../../../components/Thing/Intangible/Reservation/TaxiReservation/index.tsx"

export interface TaxiReservationProps {
	partySize?: Integer | QuantitativeValue
	pickupLocation?: Place
	pickupTime?: DateTime
}

type TaxiReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& TaxiReservationProps

export default TaxiReservation
