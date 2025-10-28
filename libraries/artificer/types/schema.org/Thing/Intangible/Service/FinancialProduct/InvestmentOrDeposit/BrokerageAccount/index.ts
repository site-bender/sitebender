import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

export type BrokerageAccountType = "BrokerageAccount"

export interface BrokerageAccountProps {
	"@type"?: BrokerageAccountType
}

type BrokerageAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& BrokerageAccountProps

export default BrokerageAccount
