// BrokerageAccount extends InvestmentOrDeposit but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BrokerageAccountProps {}

type BrokerageAccount =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& InvestmentOrDepositProps
	& ServiceProps
	& BrokerageAccountProps

export default BrokerageAccount
