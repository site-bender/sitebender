import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { ServiceProps } from "../../../../../../types/Thing/Intangible/Service/index.ts"
import type { FinancialProductProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/index.ts"
import type { InvestmentOrDepositProps } from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BaseComponentProps<
	InvestmentOrDepositProps,
	"InvestmentOrDeposit",
	ExtractLevelProps<ThingProps, IntangibleProps, ServiceProps, FinancialProductProps>
>

export default function InvestmentOrDeposit({
	amount,
	schemaType = "InvestmentOrDeposit",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<FinancialProduct
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				amount,
				...subtypeProperties,
			}}
		/>
	)
}
