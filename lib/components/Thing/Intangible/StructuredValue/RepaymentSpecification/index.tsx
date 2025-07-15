import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type RepaymentSpecificationProps from "../../../../../types/Thing/RepaymentSpecification/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	RepaymentSpecificationProps,
	"RepaymentSpecification",
	ExtractLevelProps<RepaymentSpecificationProps, StructuredValueProps>
>

export default function RepaymentSpecification(
	{
		downPayment,
		earlyPrepaymentPenalty,
		loanPaymentAmount,
		loanPaymentFrequency,
		numberOfLoanPayments,
		schemaType = "RepaymentSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
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
