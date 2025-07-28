import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { FinancialIncentiveProps } from "../../../../types/Thing/Intangible/FinancialIncentive/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	FinancialIncentiveProps,
	"FinancialIncentive",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function FinancialIncentive({
	areaServed,
	eligibleWithSupplier,
	incentiveAmount,
	incentiveStatus,
	incentiveType,
	incentivizedItem,
	incomeLimit,
	provider,
	publisher,
	purchasePriceLimit,
	purchaseType,
	qualifiedExpense,
	validFrom,
	validThrough,
	schemaType = "FinancialIncentive",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				areaServed,
				eligibleWithSupplier,
				incentiveAmount,
				incentiveStatus,
				incentiveType,
				incentivizedItem,
				incomeLimit,
				provider,
				publisher,
				purchasePriceLimit,
				purchaseType,
				qualifiedExpense,
				validFrom,
				validThrough,
				...subtypeProperties,
			}}
		/>
	)
}
