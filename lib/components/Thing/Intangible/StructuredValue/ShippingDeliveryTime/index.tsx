import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ShippingDeliveryTimeProps from "../../../../../types/Thing/ShippingDeliveryTime/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingDeliveryTimeProps,
	"ShippingDeliveryTime",
	ExtractLevelProps<ShippingDeliveryTimeProps, StructuredValueProps>
>

export default function ShippingDeliveryTime(
	{
		businessDays,
		cutoffTime,
		handlingTime,
		transitTime,
		schemaType = "ShippingDeliveryTime",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
