import type {
	Boolean,
	Number,
	Text,
	URL,
} from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type Duration from "../../../Quantity/Duration/index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type RepaymentSpecification from "../../../StructuredValue/RepaymentSpecification/index.ts"

export interface LoanOrCreditProps {
	amount?: MonetaryAmount | Number
	currency?: Text
	gracePeriod?: Duration
	loanRepaymentForm?: RepaymentSpecification
	loanTerm?: QuantitativeValue
	loanType?: Text | URL
	recourseLoan?: Boolean
	renegotiableLoan?: Boolean
	requiredCollateral?: Text | Thing
}

type LoanOrCredit =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& LoanOrCreditProps

export default LoanOrCredit
