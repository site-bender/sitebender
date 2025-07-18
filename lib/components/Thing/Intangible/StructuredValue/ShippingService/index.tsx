import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ShippingServiceProps from "../../../../../types/Thing/ShippingService/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingServiceProps,
	"ShippingService",
	ExtractLevelProps<ShippingServiceProps, StructuredValueProps>
>

export default function ShippingService(
	{
		fulfillmentType,
		handlingTime,
		shippingConditions,
		validForMemberTier,
		schemaType = "ShippingService",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
