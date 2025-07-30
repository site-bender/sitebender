import type BaseProps from "../../../../../../../types/index.ts"
import type MortgageLoanProps from "../../../../../../../types/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/MortgageLoan/index.ts"

import LoanOrCredit from "../index.tsx"

export type Props = MortgageLoanProps & BaseProps

export default function MortgageLoan({
	domiciledMortgage,
	loanMortgageMandateAmount,
	_type = "MortgageLoan",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LoanOrCredit
			{...props}
			_type={_type}
			subtypeProperties={{
				domiciledMortgage,
				loanMortgageMandateAmount,
				...subtypeProperties,
			}}
		>{children}</LoanOrCredit>
	)
}
