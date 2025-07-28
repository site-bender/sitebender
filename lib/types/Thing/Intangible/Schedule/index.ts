import type {
	Date,
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type DayOfWeek from "../Enumeration/DayOfWeek/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import ScheduleComponent from "../../../../../components/Thing/Intangible/Schedule/index.tsx"

export interface ScheduleProps {
	byDay?: DayOfWeek | Text
	byMonth?: Integer
	byMonthDay?: Integer
	byMonthWeek?: Integer
	duration?: Duration | QuantitativeValue
	endDate?: Date | DateTime
	endTime?: DateTime | Time
	exceptDate?: Date | DateTime
	repeatCount?: Integer
	repeatFrequency?: Duration | Text
	scheduleTimezone?: Text
	startDate?: Date | DateTime
	startTime?: DateTime | Time
}

type Schedule =
	& Thing
	& IntangibleProps
	& ScheduleProps

export default Schedule
