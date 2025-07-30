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

import ThingComponent from "../../../../../../components/Thing/index.ts"
import DurationComponent from "../../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import MonetaryAmountComponent from "../../../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import QuantitativeValueComponent from "../../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import RepaymentSpecificationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/RepaymentSpecification/index.ts"

export interface LoanOrCreditProps {
	"@type"?: "LoanOrCredit"
	amount?: MonetaryAmount | Number | ReturnType<typeof MonetaryAmountComponent>
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
