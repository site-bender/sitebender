import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type FoodEventProps from "../../../../types/Thing/FoodEvent/index.ts"

import Event from "./index.tsx"

// FoodEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	FoodEventProps,
	"FoodEvent",
	ExtractLevelProps<FoodEventProps, EventProps>
>

export default function FoodEvent({
	schemaType = "FoodEvent",
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
