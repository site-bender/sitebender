import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ShippingConditionsProps } from "../../../../../types/Thing/Intangible/StructuredValue/ShippingConditions/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingConditionsProps,
	"ShippingConditions",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

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
	schemaType = "ShippingConditions",
	subtypeProperties = {},
	...props
}): Props {
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
