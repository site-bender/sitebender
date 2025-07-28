import type { Boolean } from "../../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { LoanOrCreditProps } from "../index.ts"
import type MonetaryAmount from "../../../../StructuredValue/MonetaryAmount/index.ts"

import MortgageLoanComponent from "../../../../../../../../components/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/MortgageLoan/index.tsx"

export interface MortgageLoanProps {
	domiciledMortgage?: Boolean
	loanMortgageMandateAmount?: MonetaryAmount
}

type MortgageLoan =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& LoanOrCreditProps
	& MortgageLoanProps

export default MortgageLoan
