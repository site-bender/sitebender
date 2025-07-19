import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

export interface InvestmentOrDepositProps {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
}

type InvestmentOrDeposit =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& ServiceProps
	& InvestmentOrDepositProps

export default InvestmentOrDeposit
