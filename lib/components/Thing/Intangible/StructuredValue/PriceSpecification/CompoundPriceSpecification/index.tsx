import type BaseProps from "../../../../../../types/index.ts"
import type { CompoundPriceSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/CompoundPriceSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = CompoundPriceSpecificationProps & BaseProps

export default function CompoundPriceSpecification({
	priceComponent,
	priceType,
	_type = "CompoundPriceSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PriceSpecification
			{...props}
			_type={_type}
			subtypeProperties={{
				priceComponent,
				priceType,
				...subtypeProperties,
			}}
		/>
	)
}
