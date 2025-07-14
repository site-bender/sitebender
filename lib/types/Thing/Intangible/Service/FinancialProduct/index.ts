import { Number, Text, URL } from "../../../../DataType/index.ts"
import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Service from "../index.ts"

export default interface FinancialProduct extends Service {
	/** The annual rate that is charged for borrowing (or made by investing), expressed as a single percentage number that represents the actual yearly cost of funds over the term of a loan. This includes any fees or additional costs associated with the transaction. */
	annualPercentageRate?: Number | QuantitativeValue
	/** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
	feesAndCommissionsSpecification?: Text | URL
	/** The interest rate, charged or paid, applicable to the financial product. Note: This is different from the calculated annualPercentageRate. */
	interestRate?: Number | QuantitativeValue
}
