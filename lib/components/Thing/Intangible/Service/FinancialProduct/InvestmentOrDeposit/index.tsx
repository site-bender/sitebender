import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FinancialProductProps from "../../../../../../types/Thing/FinancialProduct/index.ts"
import type InvestmentOrDepositProps from "../../../../../../types/Thing/InvestmentOrDeposit/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = BaseComponentProps<
	InvestmentOrDepositProps,
	"InvestmentOrDeposit",
	ExtractLevelProps<InvestmentOrDepositProps, FinancialProductProps>
>

export default function InvestmentOrDeposit(
	{
		amount,
		schemaType = "InvestmentOrDeposit",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
