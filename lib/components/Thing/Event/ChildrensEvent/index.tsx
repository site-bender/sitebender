import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ChildrensEventProps from "../../../../types/Thing/ChildrensEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "../index.tsx"

// ChildrensEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	ChildrensEventProps,
	"ChildrensEvent",
	ExtractLevelProps<ChildrensEventProps, EventProps>
>

export default function ChildrensEvent({
	schemaType = "ChildrensEvent",
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
