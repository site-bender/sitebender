import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PriceSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	PriceSpecificationProps,
	"PriceSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

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
	schemaType = "PriceSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
