import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

export interface ServicePeriodProps {
	businessDays?: DayOfWeek | OpeningHoursSpecification
	cutoffTime?: Time
	duration?: Duration | QuantitativeValue
}

type ServicePeriod =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ServicePeriodProps

export default ServicePeriod
