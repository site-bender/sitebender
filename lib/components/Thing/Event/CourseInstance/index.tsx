import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { EventProps } from "../../../../types/Thing/Event/index.ts"
import type { CourseInstanceProps } from "../../../../types/Thing/Event/CourseInstance/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	CourseInstanceProps,
	"CourseInstance",
	ExtractLevelProps<ThingProps, EventProps>
>

export default function CourseInstance({
	courseMode,
	courseSchedule,
	courseWorkload,
	instructor,
	schemaType = "CourseInstance",
	subtypeProperties = {},
	...props
}): Props {
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
