import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

export type InvestmentFundType = "InvestmentFund"

export interface InvestmentFundProps {
	"@type"?: InvestmentFundType
}

type InvestmentFund =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& InvestmentFundProps

export default InvestmentFund
