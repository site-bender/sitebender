import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type DeliveryEventProps from "../../../../types/Thing/DeliveryEvent/index.ts"
import type EventProps from "../../../../types/Thing/Event/index.ts"

import Event from "./index.tsx"

export type Props = BaseComponentProps<
	DeliveryEventProps,
	"DeliveryEvent",
	ExtractLevelProps<DeliveryEventProps, EventProps>
>

export default function DeliveryEvent(
	{
		accessCode,
		availableFrom,
		availableThrough,
		hasDeliveryMethod,
		schemaType = "DeliveryEvent",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Event
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				accessCode,
				availableFrom,
				availableThrough,
				hasDeliveryMethod,
				...subtypeProperties,
			}}
		/>
	)
}
