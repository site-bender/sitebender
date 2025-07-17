import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type VisualArtsEventProps from "../../../../types/Thing/VisualArtsEvent/index.ts"

import Event from "../index.tsx"

// VisualArtsEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	VisualArtsEventProps,
	"VisualArtsEvent",
	ExtractLevelProps<VisualArtsEventProps, EventProps>
>

export default function VisualArtsEvent({
	schemaType = "VisualArtsEvent",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
