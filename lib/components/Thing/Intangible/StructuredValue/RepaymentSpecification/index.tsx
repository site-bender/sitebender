import type BaseProps from "../../../../../types/index.ts"
import type RepaymentSpecificationProps from "../../../../../types/Thing/Intangible/StructuredValue/RepaymentSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = RepaymentSpecificationProps & BaseProps

export default function RepaymentSpecification({
	downPayment,
	earlyPrepaymentPenalty,
	loanPaymentAmount,
	loanPaymentFrequency,
	numberOfLoanPayments,
	_type = "RepaymentSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				downPayment,
				earlyPrepaymentPenalty,
				loanPaymentAmount,
				loanPaymentFrequency,
				numberOfLoanPayments,
				...subtypeProperties,
			}}
		/>
	)
}
