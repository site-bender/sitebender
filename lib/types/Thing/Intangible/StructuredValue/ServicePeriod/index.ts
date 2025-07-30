import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import DayOfWeekComponent from "../../../../../components/Thing/Intangible/Enumeration/DayOfWeek/index.ts"
import DurationComponent from "../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import OpeningHoursSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface ServicePeriodProps {
	"@type"?: "ServicePeriod"
	businessDays?:
		| DayOfWeek
		| OpeningHoursSpecification
		| ReturnType<typeof DayOfWeekComponent>
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	cutoffTime?: Time
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type ServicePeriod =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ServicePeriodProps

export default ServicePeriod
