import { DateTime, Integer, Text, Time } from "../../../../DataType/index.ts"
import QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Reservation from "../index.ts"

export default interface LodgingReservation extends Reservation {
	/** The earliest someone may check into a lodging establishment. */
	checkinTime?: DateTime | Time
	/** The latest someone may check out of a lodging establishment. */
	checkoutTime?: DateTime | Time
	/** A full description of the lodging unit. */
	lodgingUnitDescription?: Text
	/** Textual description of the unit type (including suite vs. room, size of bed, etc.). */
	lodgingUnitType?: QualitativeValue | Text
	/** The number of adults staying in the unit. */
	numAdults?: QuantitativeValue | Integer
	/** The number of children staying in the unit. */
	numChildren?: QuantitativeValue | Integer
}
