import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ShippingDeliveryTimeProps } from "../../../../../types/Thing/Intangible/StructuredValue/ShippingDeliveryTime/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingDeliveryTimeProps,
	"ShippingDeliveryTime",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function ShippingDeliveryTime({
	businessDays,
	cutoffTime,
	handlingTime,
	transitTime,
	schemaType = "ShippingDeliveryTime",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				businessDays,
				cutoffTime,
				handlingTime,
				transitTime,
				...subtypeProperties,
			}}
		/>
	)
}
