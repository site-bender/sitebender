import type BaseProps from "../../../../../../types/index.ts"
import type LoanOrCreditProps from "../../../../../../types/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"

import FinancialProduct from "../index.tsx"

export type Props = LoanOrCreditProps & BaseProps

export default function LoanOrCredit({
	amount,
	currency,
	gracePeriod,
	loanRepaymentForm,
	loanTerm,
	loanType,
	recourseLoan,
	renegotiableLoan,
	requiredCollateral,
	_type = "LoanOrCredit",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FinancialProduct
			{...props}
			_type={_type}
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
		>
			{children}
		</FinancialProduct>
	)
}
