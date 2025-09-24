import type {
	Boolean,
	Number,
	Text,
	URL,
} from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type Duration from "../../../Quantity/Duration/index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type RepaymentSpecification from "../../../StructuredValue/RepaymentSpecification/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type { CreditCardType } from "./CreditCard/index.ts"
import type { MortgageLoanType } from "./MortgageLoan/index.ts"

import ThingComponent from "../../../../../../../../codewright/src/define/Thing/index.tsx"
import DurationComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import MonetaryAmountComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import QuantitativeValueComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import RepaymentSpecificationComponent from "../../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/RepaymentSpecification/index.tsx"

export type LoanOrCreditType =
	| "LoanOrCredit"
	| CreditCardType
	| MortgageLoanType

export interface LoanOrCreditProps {
	"@type"?: LoanOrCreditType
	amount?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
	currency?: Text
	gracePeriod?: Duration | ReturnType<typeof DurationComponent>
	loanRepaymentForm?:
		| RepaymentSpecification
		| ReturnType<typeof RepaymentSpecificationComponent>
	loanTerm?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	loanType?: Text | URL
	recourseLoan?: Boolean
	renegotiableLoan?: Boolean
	requiredCollateral?: Text | Thing | ReturnType<typeof ThingComponent>
}

type LoanOrCredit =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& LoanOrCreditProps

export default LoanOrCredit
