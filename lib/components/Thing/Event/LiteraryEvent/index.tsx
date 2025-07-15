import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type LiteraryEventProps from "../../../../types/Thing/LiteraryEvent/index.ts"

import Event from "./index.tsx"

// LiteraryEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	LiteraryEventProps,
	"LiteraryEvent",
	ExtractLevelProps<LiteraryEventProps, EventProps>
>

export default function LiteraryEvent({
	schemaType = "LiteraryEvent",
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
