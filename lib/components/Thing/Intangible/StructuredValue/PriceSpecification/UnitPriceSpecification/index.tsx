import type BaseProps from "../../../../../../types/index.ts"
import type UnitPriceSpecificationProps from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = UnitPriceSpecificationProps & BaseProps

export default function UnitPriceSpecification({
	billingDuration,
	billingIncrement,
	billingStart,
	priceComponentType,
	priceType,
	referenceQuantity,
	unitCode,
	unitText,
	_type = "UnitPriceSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PriceSpecification
			{...props}
			_type={_type}
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
