import type BaseProps from "../../../../types/index.ts"
import type { DeliveryEventProps } from "../../../../types/Thing/Event/DeliveryEvent/index.ts"

import Event from "../index.tsx"

export type Props = DeliveryEventProps & BaseProps

export default function DeliveryEvent({
	accessCode,
	availableFrom,
	availableThrough,
	hasDeliveryMethod,
	_type = "DeliveryEvent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Event
			{...props}
			_type={_type}
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
