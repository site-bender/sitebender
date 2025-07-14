import { Text, URL } from "../../../../DataType/index.ts"
import LocalBusiness from "../index.ts"

export default interface FinancialService extends LocalBusiness {
	/** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
	feesAndCommissionsSpecification?: Text | URL
}
