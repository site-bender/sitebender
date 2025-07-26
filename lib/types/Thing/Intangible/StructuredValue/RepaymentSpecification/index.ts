import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"

export interface RepaymentSpecificationProps {
	downPayment?: MonetaryAmount | Number
	earlyPrepaymentPenalty?: MonetaryAmount
	loanPaymentAmount?: MonetaryAmount
	loanPaymentFrequency?: Number
	numberOfLoanPayments?: Number
}

type RepaymentSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& RepaymentSpecificationProps

export default RepaymentSpecification
