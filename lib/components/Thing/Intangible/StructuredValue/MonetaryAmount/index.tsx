import type BaseProps from "../../../../../types/index.ts"
import type { MonetaryAmountProps } from "../../../../../types/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"

import StructuredValue from "../index.tsx"

export type Props = MonetaryAmountProps & BaseProps

export default function MonetaryAmount({
	currency,
	maxValue,
	minValue,
	validFrom,
	validThrough,
	value,
	_type = "MonetaryAmount",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				currency,
				maxValue,
				minValue,
				validFrom,
				validThrough,
				value,
				...subtypeProperties,
			}}
		/>
	)
}
