import type { Date, DateTime, Time } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type DayOfWeek from "../../Enumeration/DayOfWeek/index.ts"

import OpeningHoursSpecificationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.tsx"

export interface OpeningHoursSpecificationProps {
	closes?: Time
	dayOfWeek?: DayOfWeek
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
