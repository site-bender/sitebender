import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../../InvestmentOrDeposit/index.ts"
import type { BankAccountProps } from "../index.ts"

export type DepositAccountType = "DepositAccount"

export interface DepositAccountProps {
	"@type"?: DepositAccountType
}

type DepositAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& BankAccountProps
	& DepositAccountProps

export default DepositAccount
