import { Boolean } from "../../../../../../DataType/index.ts"
import MonetaryAmount from "../../../../StructuredValue/MonetaryAmount/index.ts"
import LoanOrCredit from "../index.ts"

export default interface MortgageLoan extends LoanOrCredit {
	/** Whether borrower is a resident of the jurisdiction where the property is located. */
	domiciledMortgage?: Boolean
	/** Amount of mortgage mandate that can be converted into a proper mortgage at a later stage. */
	loanMortgageMandateAmount?: MonetaryAmount
}
