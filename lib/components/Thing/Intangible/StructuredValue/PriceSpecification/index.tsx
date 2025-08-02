import type BaseProps from "../../../../../types/index.ts"
import type PriceSpecificationProps from "../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = PriceSpecificationProps & BaseProps

export default function PriceSpecification({
	eligibleQuantity,
	eligibleTransactionVolume,
	maxPrice,
	membershipPointsEarned,
	minPrice,
	price,
	priceCurrency,
	validForMemberTier,
	validFrom,
	validThrough,
	valueAddedTaxIncluded,
	_type = "PriceSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				eligibleQuantity,
				eligibleTransactionVolume,
				maxPrice,
				membershipPointsEarned,
				minPrice,
				price,
				priceCurrency,
				validForMemberTier,
				validFrom,
				validThrough,
				valueAddedTaxIncluded,
				...subtypeProperties,
			}}
		>
			{children}
		</StructuredValue>
	)
}
