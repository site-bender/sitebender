import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type { BrokerageAccountType } from "./BrokerageAccount/index.ts"
import type { DepositAccountType } from "./DepositAccount/index.ts"
import type { InvestmentFundType } from "./InvestmentFund/index.ts"

import MonetaryAmountComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"

export type InvestmentOrDepositType =
	| "InvestmentOrDeposit"
	| DepositAccountType
	| BrokerageAccountType
	| InvestmentFundType

export interface InvestmentOrDepositProps {
	"@type"?: InvestmentOrDepositType
	amount?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
}

type InvestmentOrDeposit =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps

export default InvestmentOrDeposit
