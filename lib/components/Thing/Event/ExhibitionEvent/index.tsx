import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type ExhibitionEventProps from "../../../../types/Thing/ExhibitionEvent/index.ts"

import Event from "./index.tsx"

// ExhibitionEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	ExhibitionEventProps,
	"ExhibitionEvent",
	ExtractLevelProps<ExhibitionEventProps, EventProps>
>

export default function ExhibitionEvent({
	schemaType = "ExhibitionEvent",
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
