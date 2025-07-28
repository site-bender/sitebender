import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ShippingServiceProps } from "../../../../../types/Thing/Intangible/StructuredValue/ShippingService/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ShippingServiceProps,
	"ShippingService",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function ShippingService({
	fulfillmentType,
	handlingTime,
	shippingConditions,
	validForMemberTier,
	schemaType = "ShippingService",
	subtypeProperties = {},
	...props
}): Props {
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
