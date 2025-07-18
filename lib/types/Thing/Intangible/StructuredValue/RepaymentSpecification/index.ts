import type { Number } from "../../../../DataType/index.ts"
import type StructuredValue from "../index.ts"
import type MonetaryAmount from "../MonetaryAmount/index.ts"

export default interface RepaymentSpecification extends StructuredValue {
	/** a type of payment made in cash during the onset of the purchase of an expensive good/service. The payment typically represents only a percentage of the full purchase price. */
	downPayment?: Number | MonetaryAmount
	/** The amount to be paid as a penalty in the event of early payment of the loan. */
	earlyPrepaymentPenalty?: MonetaryAmount
	/** The amount of money to pay in a single payment. */
	loanPaymentAmount?: MonetaryAmount
	/** Frequency of payments due, i.e. number of months between payments. This is defined as a frequency, i.e. the reciprocal of a period of time. */
	loanPaymentFrequency?: Number
	/** The number of payments contractually required at origination to repay the loan. For monthly paying loans this is the number of months from the contractual first payment date to the maturity date. */
	numberOfLoanPayments?: Number
}
