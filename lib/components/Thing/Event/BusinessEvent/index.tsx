import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BusinessEventProps from "../../../../types/Thing/BusinessEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "./index.tsx"

// BusinessEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	BusinessEventProps,
	"BusinessEvent",
	ExtractLevelProps<BusinessEventProps, EventProps>
>

export default function BusinessEvent({
	schemaType = "BusinessEvent",
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
