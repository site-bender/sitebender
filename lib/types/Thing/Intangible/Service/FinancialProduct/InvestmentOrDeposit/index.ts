import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"

export interface InvestmentOrDepositProps {
	amount?: MonetaryAmount | Number
}

type InvestmentOrDeposit =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& InvestmentOrDepositProps

export default InvestmentOrDeposit
