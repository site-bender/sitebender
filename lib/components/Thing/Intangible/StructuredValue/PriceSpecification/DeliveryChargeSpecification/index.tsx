import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PriceSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import type { DeliveryChargeSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/DeliveryChargeSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = BaseComponentProps<
	DeliveryChargeSpecificationProps,
	"DeliveryChargeSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, PriceSpecificationProps>
>

export default function DeliveryChargeSpecification({
	appliesToDeliveryMethod,
	areaServed,
	eligibleRegion,
	ineligibleRegion,
	schemaType = "DeliveryChargeSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PriceSpecification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				appliesToDeliveryMethod,
				areaServed,
				eligibleRegion,
				ineligibleRegion,
				...subtypeProperties,
			}}
		/>
	)
}
