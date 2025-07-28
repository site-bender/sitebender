import type BaseProps from "../../../../../types/index.ts"
import type { ShippingServiceProps } from "../../../../../types/Thing/Intangible/StructuredValue/ShippingService/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ShippingServiceProps & BaseProps

export default function ShippingService({
	fulfillmentType,
	handlingTime,
	shippingConditions,
	validForMemberTier,
	_type = "ShippingService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				fulfillmentType,
				handlingTime,
				shippingConditions,
				validForMemberTier,
				...subtypeProperties,
			}}
		/>
	)
}
