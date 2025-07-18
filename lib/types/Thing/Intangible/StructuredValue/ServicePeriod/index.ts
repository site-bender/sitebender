import type { Time } from "../../../../DataType/index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type StructuredValue from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

export default interface ServicePeriod extends StructuredValue {
	/** Days of the week when the merchant typically operates, indicated via opening hours markup. */
	businessDays?: DayOfWeek | OpeningHoursSpecification
	/** Order cutoff time allows merchants to describe the time after which they will no longer process orders received on that day. For orders processed after cutoff time, one day gets added to the delivery time estimate. This property is expected to be most typically used via the [[ShippingRateSettings]] publication pattern. The time is indicated using the ISO-8601 Time format, e.g. "23:30:00-05:00" would represent 6:30 pm Eastern Standard Time (EST) which is 5 hours behind Coordinated Universal Time (UTC). */
	cutoffTime?: Time
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
}
