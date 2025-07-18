import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type TheaterEventProps from "../../../../types/Thing/TheaterEvent/index.ts"

import Event from "../index.tsx"

// TheaterEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	TheaterEventProps,
	"TheaterEvent",
	ExtractLevelProps<TheaterEventProps, EventProps>
>

export default function TheaterEvent({
	schemaType = "TheaterEvent",
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
