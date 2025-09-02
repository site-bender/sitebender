import type {
	Date,
	DateTime,
	Integer,
	Text,
	Time,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DayOfWeek from "../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import { DayOfWeek as DayOfWeekComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type ScheduleType = "Schedule"

export interface ScheduleProps {
	"@type"?: ScheduleType
	byDay?: DayOfWeek | Text | ReturnType<typeof DayOfWeekComponent>
	byMonth?: Integer
	byMonthDay?: Integer
	byMonthWeek?: Integer
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	endDate?: Date | DateTime
	endTime?: DateTime | Time
	exceptDate?: Date | DateTime
	repeatCount?: Integer
	repeatFrequency?: Duration | Text | ReturnType<typeof DurationComponent>
	scheduleTimezone?: Text
	startDate?: Date | DateTime
	startTime?: DateTime | Time
}

type Schedule = Thing & IntangibleProps & ScheduleProps

export default Schedule
