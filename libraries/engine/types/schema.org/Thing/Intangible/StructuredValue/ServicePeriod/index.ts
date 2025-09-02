import type { Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import { DayOfWeek as DayOfWeekComponent } from "../../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { OpeningHoursSpecification as OpeningHoursSpecificationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type ServicePeriodType = "ServicePeriod"

export interface ServicePeriodProps {
	"@type"?: ServicePeriodType
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
