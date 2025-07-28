import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PriceSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import type { UnitPriceSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = BaseComponentProps<
	UnitPriceSpecificationProps,
	"UnitPriceSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, PriceSpecificationProps>
>

export default function UnitPriceSpecification({
	billingDuration,
	billingIncrement,
	billingStart,
	priceComponentType,
	priceType,
	referenceQuantity,
	unitCode,
	unitText,
	schemaType = "UnitPriceSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PriceSpecification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				billingDuration,
				billingIncrement,
				billingStart,
				priceComponentType,
				priceType,
				referenceQuantity,
				unitCode,
				unitText,
				...subtypeProperties,
			}}
		/>
	)
}
