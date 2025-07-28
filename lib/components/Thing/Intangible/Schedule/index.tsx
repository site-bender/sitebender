import type BaseProps from "../../../../types/index.ts"
import type { ScheduleProps } from "../../../../types/Thing/Intangible/Schedule/index.ts"

import Intangible from "../index.tsx"

export type Props = ScheduleProps & BaseProps

export default function Schedule({
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
	_type = "Schedule",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
