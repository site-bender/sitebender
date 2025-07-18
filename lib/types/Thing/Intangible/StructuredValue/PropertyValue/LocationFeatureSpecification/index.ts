import type { Date, DateTime } from "../../../../../DataType/index.ts"
import type OpeningHoursSpecification from "../../OpeningHoursSpecification/index.ts"
import type PropertyValue from "../index.ts"

export default interface LocationFeatureSpecification extends PropertyValue {
	/** The hours during which this service or contact is available. */
	hoursAvailable?: OpeningHoursSpecification
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The date after when the item is not valid. For example the end of an offer, salary period, or a period of opening hours. */
	validThrough?: Date | DateTime
}
