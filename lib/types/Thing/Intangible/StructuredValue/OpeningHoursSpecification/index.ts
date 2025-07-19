import type { Date, DateTime, Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

export interface OpeningHoursSpecificationProps {
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

type OpeningHoursSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OpeningHoursSpecificationProps

export default OpeningHoursSpecification
