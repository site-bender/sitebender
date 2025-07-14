import { Date, DateTime, Time } from "../../../../DataType/index.ts"
import DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import StructuredValue from "../index.ts"

export default interface OpeningHoursSpecification extends StructuredValue {
	/** The closing hour of the place or service on the given day(s) of the week. */
	closes?: Time
	/** The day of the week for which these opening hours are valid. */
	dayOfWeek?: DayOfWeek
	/** The opening hour of the place or service on the given day(s) of the week. */
	opens?: Time
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
}
