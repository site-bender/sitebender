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

import { QualitativeValue as QualitativeValueComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type LodgingReservationType = "LodgingReservation"

export interface LodgingReservationProps {
	"@type"?: LodgingReservationType
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
