import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { EventProps } from "../../../../types/Thing/Event/index.ts"
import type { DeliveryEventProps } from "../../../../types/Thing/Event/DeliveryEvent/index.ts"

import Event from "../index.tsx"

export type Props = BaseComponentProps<
	DeliveryEventProps,
	"DeliveryEvent",
	ExtractLevelProps<ThingProps, EventProps>
>

export default function DeliveryEvent({
	accessCode,
	availableFrom,
	availableThrough,
	hasDeliveryMethod,
	schemaType = "DeliveryEvent",
	subtypeProperties = {},
	...props
}): Props {
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
