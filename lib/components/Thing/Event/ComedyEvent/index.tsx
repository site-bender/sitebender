import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ComedyEventProps from "../../../../types/Thing/ComedyEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "../index.tsx"

// ComedyEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	ComedyEventProps,
	"ComedyEvent",
	ExtractLevelProps<ComedyEventProps, EventProps>
>

export default function ComedyEvent({
	schemaType = "ComedyEvent",
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
