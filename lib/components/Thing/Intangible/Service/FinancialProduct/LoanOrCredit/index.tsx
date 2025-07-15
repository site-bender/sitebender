import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FinancialProductProps from "../../../../../../types/Thing/FinancialProduct/index.ts"
import type LoanOrCreditProps from "../../../../../../types/Thing/LoanOrCredit/index.ts"

import FinancialProduct from "./index.tsx"

export type Props = BaseComponentProps<
	LoanOrCreditProps,
	"LoanOrCredit",
	ExtractLevelProps<LoanOrCreditProps, FinancialProductProps>
>

export default function LoanOrCredit(
	{
		amount,
		currency,
		gracePeriod,
		loanRepaymentForm,
		loanTerm,
		loanType,
		recourseLoan,
		renegotiableLoan,
		requiredCollateral,
		schemaType = "LoanOrCredit",
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
				currency,
				gracePeriod,
				loanRepaymentForm,
				loanTerm,
				loanType,
				recourseLoan,
				renegotiableLoan,
				requiredCollateral,
				...subtypeProperties,
			}}
		/>
	)
}
