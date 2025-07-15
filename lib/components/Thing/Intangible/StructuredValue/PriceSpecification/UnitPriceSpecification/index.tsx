import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PriceSpecificationProps from "../../../../../../types/Thing/PriceSpecification/index.ts"
import type UnitPriceSpecificationProps from "../../../../../../types/Thing/UnitPriceSpecification/index.ts"

import PriceSpecification from "./index.tsx"

export type Props = BaseComponentProps<
	UnitPriceSpecificationProps,
	"UnitPriceSpecification",
	ExtractLevelProps<UnitPriceSpecificationProps, PriceSpecificationProps>
>

export default function UnitPriceSpecification(
	{
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
	}: Props,
) {
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
