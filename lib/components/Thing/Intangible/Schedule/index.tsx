import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type ScheduleProps from "../../../../types/Thing/Schedule/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	ScheduleProps,
	"Schedule",
	ExtractLevelProps<ScheduleProps, IntangibleProps>
>

export default function Schedule(
	{
		byDay,
		byMonth,
		byMonthDay,
		byMonthWeek,
		duration,
		endDate,
		endTime,
		exceptDate,
		repeatCount,
		repeatFrequency,
		scheduleTimezone,
		startDate,
		startTime,
		schemaType = "Schedule",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				byDay,
				byMonth,
				byMonthDay,
				byMonthWeek,
				duration,
				endDate,
				endTime,
				exceptDate,
				repeatCount,
				repeatFrequency,
				scheduleTimezone,
				startDate,
				startTime,
				...subtypeProperties,
			}}
		/>
	)
}
