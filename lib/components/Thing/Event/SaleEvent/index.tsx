import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"
import type SaleEventProps from "../../../../types/Thing/SaleEvent/index.ts"

import Event from "../index.tsx"

// SaleEvent adds no properties to the Event schema type
export type Props = BaseComponentProps<
	SaleEventProps,
	"SaleEvent",
	ExtractLevelProps<SaleEventProps, EventProps>
>

export default function SaleEvent({
	schemaType = "SaleEvent",
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
