import type BaseProps from "../../../../types/index.ts"
import type FinancialIncentiveProps from "../../../../types/Thing/Intangible/FinancialIncentive/index.ts"

import Intangible from "../index.tsx"

export type Props = FinancialIncentiveProps & BaseProps

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
	_type = "FinancialIncentive",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
		>{children}</Intangible>
	)
}
