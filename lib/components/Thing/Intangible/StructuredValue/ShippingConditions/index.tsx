import type BaseProps from "../../../../../types/index.ts"
import type ShippingConditionsProps from "../../../../../types/Thing/Intangible/StructuredValue/ShippingConditions/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ShippingConditionsProps & BaseProps

export default function ShippingConditions({
	depth,
	doesNotShip,
	height,
	numItems,
	orderValue,
	seasonalOverride,
	shippingDestination,
	shippingOrigin,
	shippingRate,
	transitTime,
	weight,
	width,
	_type = "ShippingConditions",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				depth,
				doesNotShip,
				height,
				numItems,
				orderValue,
				seasonalOverride,
				shippingDestination,
				shippingOrigin,
				shippingRate,
				transitTime,
				weight,
				width,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
