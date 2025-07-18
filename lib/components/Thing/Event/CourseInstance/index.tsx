import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CourseInstanceProps from "../../../../types/Thing/CourseInstance/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	CourseInstanceProps,
	"CourseInstance",
	ExtractLevelProps<CourseInstanceProps, EventProps>
>

export default function CourseInstance(
	{
		courseMode,
		courseSchedule,
		courseWorkload,
		instructor,
		schemaType = "CourseInstance",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				courseMode,
				courseSchedule,
				courseWorkload,
				instructor,
				...subtypeProperties,
			}}
		/>
	)
}
