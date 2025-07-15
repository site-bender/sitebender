import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DanceEventProps from "../../../../types/Thing/DanceEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "./index.tsx"

// DanceEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	DanceEventProps,
	"DanceEvent",
	ExtractLevelProps<DanceEventProps, EventProps>
>

export default function DanceEvent({
	schemaType = "DanceEvent",
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
