import type { Date, DateTime, Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

import DayOfWeekComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/DayOfWeek/index.tsx"

export type OpeningHoursSpecificationType = "OpeningHoursSpecification"

export interface OpeningHoursSpecificationProps {
	"@type"?: OpeningHoursSpecificationType
	closes?: Time
	dayOfWeek?: DayOfWeek | ReturnType<typeof DayOfWeekComponent>
	opens?: Time
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
}

type OpeningHoursSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OpeningHoursSpecificationProps

export default OpeningHoursSpecification
