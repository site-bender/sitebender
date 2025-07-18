import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type LoanOrCreditProps from "../../../../../../../types/Thing/LoanOrCredit/index.ts"
import type MortgageLoanProps from "../../../../../../../types/Thing/MortgageLoan/index.ts"

import LoanOrCredit from "../index.tsx"

export type Props = BaseComponentProps<
	MortgageLoanProps,
	"MortgageLoan",
	ExtractLevelProps<MortgageLoanProps, LoanOrCreditProps>
>

export default function MortgageLoan(
	{
		domiciledMortgage,
		loanMortgageMandateAmount,
		schemaType = "MortgageLoan",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LoanOrCredit
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				domiciledMortgage,
				loanMortgageMandateAmount,
				...subtypeProperties,
			}}
		/>
	)
}
