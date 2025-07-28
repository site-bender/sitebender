import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ShippingRateSettingsProps } from "../../../../../types/Thing/Intangible/StructuredValue/ShippingRateSettings/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingRateSettingsProps,
	"ShippingRateSettings",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function ShippingRateSettings({
	doesNotShip,
	freeShippingThreshold,
	isUnlabelledFallback,
	orderPercentage,
	shippingDestination,
	shippingLabel,
	shippingRate,
	weightPercentage,
	schemaType = "ShippingRateSettings",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
