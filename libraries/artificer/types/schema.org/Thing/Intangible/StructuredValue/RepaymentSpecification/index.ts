import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"

import MonetaryAmountComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"

export type RepaymentSpecificationType = "RepaymentSpecification"

export interface RepaymentSpecificationProps {
	"@type"?: RepaymentSpecificationType
	downPayment?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
	earlyPrepaymentPenalty?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	loanPaymentAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	loanPaymentFrequency?: Number
	numberOfLoanPayments?: Number
}

type RepaymentSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& RepaymentSpecificationProps

export default RepaymentSpecification
