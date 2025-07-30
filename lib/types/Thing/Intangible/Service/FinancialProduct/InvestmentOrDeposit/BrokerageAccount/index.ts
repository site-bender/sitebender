import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

export interface BrokerageAccountProps {
	"@type"?: "BrokerageAccount"}

type BrokerageAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& BrokerageAccountProps

export default BrokerageAccount
