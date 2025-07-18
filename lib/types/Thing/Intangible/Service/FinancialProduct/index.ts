import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type Service from "../index.ts"
import type ServiceProps from "../index.ts"

export interface FinancialProductProps {
	/** The annual rate that is charged for borrowing (or made by investing), expressed as a single percentage number that represents the actual yearly cost of funds over the term of a loan. This includes any fees or additional costs associated with the transaction. */
	annualPercentageRate?: Number | QuantitativeValue
	/** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
	feesAndCommissionsSpecification?: Text | URL
	/** The interest rate, charged or paid, applicable to the financial product. Note: This is different from the calculated annualPercentageRate. */
	interestRate?: Number | QuantitativeValue
}

type FinancialProduct = Thing & ServiceProps & FinancialProductProps

export default FinancialProduct
