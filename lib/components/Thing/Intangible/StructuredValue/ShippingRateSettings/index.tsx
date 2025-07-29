import type BaseProps from "../../../../../types/index.ts"
import type ShippingRateSettingsProps from "../../../../../types/Thing/Intangible/StructuredValue/ShippingRateSettings/index.ts"

import StructuredValue from "../index.tsx"

export type Props = ShippingRateSettingsProps & BaseProps

export default function ShippingRateSettings({
	doesNotShip,
	freeShippingThreshold,
	isUnlabelledFallback,
	orderPercentage,
	shippingDestination,
	shippingLabel,
	shippingRate,
	weightPercentage,
	_type = "ShippingRateSettings",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				doesNotShip,
				freeShippingThreshold,
				isUnlabelledFallback,
				orderPercentage,
				shippingDestination,
				shippingLabel,
				shippingRate,
				weightPercentage,
				...subtypeProperties,
			}}
		/>
	)
}
