import type { Boolean } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type MonetaryAmount from "../../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { LoanOrCreditProps } from "../index.ts"

export interface MortgageLoanProps {
	/** Whether borrower is a resident of the jurisdiction where the property is located. */
	domiciledMortgage?: Boolean
	/** Amount of mortgage mandate that can be converted into a proper mortgage at a later stage. */
	loanMortgageMandateAmount?: MonetaryAmount
}

type MortgageLoan =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& LoanOrCreditProps
	& ServiceProps
	& MortgageLoanProps

export default MortgageLoan
