import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ShippingConditionsProps from "../../../../../types/Thing/ShippingConditions/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingConditionsProps,
	"ShippingConditions",
	ExtractLevelProps<ShippingConditionsProps, StructuredValueProps>
>

export default function ShippingConditions(
	{
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
		schemaType = "ShippingConditions",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
