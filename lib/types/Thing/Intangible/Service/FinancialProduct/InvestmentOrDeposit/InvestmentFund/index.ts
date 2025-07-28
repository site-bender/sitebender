import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

import InvestmentFundComponent from "../../../../../../../../components/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/InvestmentFund/index.tsx"

export interface InvestmentFundProps {
}

type InvestmentFund =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& InvestmentFundProps

export default InvestmentFund
