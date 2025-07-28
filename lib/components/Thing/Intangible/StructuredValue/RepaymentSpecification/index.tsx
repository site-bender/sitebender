import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { RepaymentSpecificationProps } from "../../../../../types/Thing/Intangible/StructuredValue/RepaymentSpecification/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	RepaymentSpecificationProps,
	"RepaymentSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function RepaymentSpecification({
	downPayment,
	earlyPrepaymentPenalty,
	loanPaymentAmount,
	loanPaymentFrequency,
	numberOfLoanPayments,
	schemaType = "RepaymentSpecification",
	subtypeProperties = {},
	...props
}): Props {
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
