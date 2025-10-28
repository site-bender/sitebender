import type { Boolean } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type MonetaryAmount from "../../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { LoanOrCreditProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"

export type MortgageLoanType = "MortgageLoan"

export interface MortgageLoanProps {
	"@type"?: MortgageLoanType
	domiciledMortgage?: Boolean
	loanMortgageMandateAmount?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
}

type MortgageLoan =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& LoanOrCreditProps
	& MortgageLoanProps

export default MortgageLoan
