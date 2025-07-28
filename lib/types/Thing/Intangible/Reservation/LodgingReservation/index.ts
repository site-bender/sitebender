import type {
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { ReservationProps } from "../index.ts"

import QualitativeValueComponent from "../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface LodgingReservationProps {
	checkinTime?: DateTime | Time
	checkoutTime?: DateTime | Time
	lodgingUnitDescription?: Text
	lodgingUnitType?:
		| QualitativeValue
		| Text
		| ReturnType<typeof QualitativeValueComponent>
	numAdults?:
		| Integer
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numChildren?:
		| Integer
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type LodgingReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& LodgingReservationProps

export default LodgingReservation
