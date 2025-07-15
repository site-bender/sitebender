import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PriceSpecificationProps from "../../../../../types/Thing/PriceSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	PriceSpecificationProps,
	"PriceSpecification",
	ExtractLevelProps<PriceSpecificationProps, StructuredValueProps>
>

export default function PriceSpecification(
	{
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
	}: Props,
) {
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
