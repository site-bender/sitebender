import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EducationEventProps from "../../../../types/Thing/EducationEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "./index.tsx"

export type Props = BaseComponentProps<
	EducationEventProps,
	"EducationEvent",
	ExtractLevelProps<EducationEventProps, EventProps>
>

export default function EducationEvent(
	{
		assesses,
		educationalLevel,
		teaches,
		schemaType = "EducationEvent",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				assesses,
				educationalLevel,
				teaches,
				...subtypeProperties,
			}}
		/>
	)
}
