import { Number } from "../../../../../DataType/index.ts"
import MonetaryAmount from "../../../StructuredValue/MonetaryAmount/index.ts"
import FinancialProduct from "../index.ts"

export default interface InvestmentOrDeposit extends FinancialProduct {
	/** The amount of money. */
	amount?: Number | MonetaryAmount
}
