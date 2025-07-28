import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../index.ts"

import BrokerageAccountComponent from "../../../../../../../../components/Thing/Intangible/Service/FinancialProduct/InvestmentOrDeposit/BrokerageAccount/index.tsx"

export interface BrokerageAccountProps {
}

type BrokerageAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& BrokerageAccountProps

export default BrokerageAccount
