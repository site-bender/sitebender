import type {
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

export interface LodgingReservationProps {
	checkinTime?: DateTime | Time
	checkoutTime?: DateTime | Time
	lodgingUnitDescription?: Text
	lodgingUnitType?: QualitativeValue | Text
	numAdults?: Integer | QuantitativeValue
	numChildren?: Integer | QuantitativeValue
}

type LodgingReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& LodgingReservationProps

export default LodgingReservation
