import type { Number } from "../../../../../DataType/index.ts"
import type MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import type FinancialProduct from "../index.ts"

export default interface InvestmentOrDeposit extends FinancialProduct {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
}
