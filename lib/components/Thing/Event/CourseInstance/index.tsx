import type BaseProps from "../../../../types/index.ts"
import type CourseInstanceProps from "../../../../types/Thing/Event/CourseInstance/index.ts"

import Event from "../index.tsx"

export type Props = CourseInstanceProps & BaseProps

export default function CourseInstance({
	courseMode,
	courseSchedule,
	courseWorkload,
	instructor,
	_type = "CourseInstance",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
			subtypeProperties={{
				courseMode,
				courseSchedule,
				courseWorkload,
				instructor,
				...subtypeProperties,
			}}
		>
			{children}
		</Event>
	)
}
