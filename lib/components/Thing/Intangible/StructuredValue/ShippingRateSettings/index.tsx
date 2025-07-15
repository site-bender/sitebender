import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ShippingRateSettingsProps from "../../../../../types/Thing/ShippingRateSettings/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	ShippingRateSettingsProps,
	"ShippingRateSettings",
	ExtractLevelProps<ShippingRateSettingsProps, StructuredValueProps>
>

export default function ShippingRateSettings(
	{
		doesNotShip,
		freeShippingThreshold,
		isUnlabelledFallback,
		orderPercentage,
		shippingDestination,
		shippingRate,
		weightPercentage,
		schemaType = "ShippingRateSettings",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
				shippingRate,
				weightPercentage,
				...subtypeProperties,
			}}
		/>
	)
}
