import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { ServiceProps } from "../../../index.ts"
import type { FinancialProductProps } from "../../index.ts"
import type { InvestmentOrDepositProps } from "../../InvestmentOrDeposit/index.ts"
import type { BankAccountProps } from "../index.ts"

export interface DepositAccountProps {}

type DepositAccount =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps
	& BankAccountProps
	& DepositAccountProps

export default DepositAccount
