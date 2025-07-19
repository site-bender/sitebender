import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../Place/LocalBusiness/index.ts"

export interface FinancialServiceProps {
	/** Description of fees, commissions, and other terms applied either to a class of financial product, or by a financial service organization. */
	feesAndCommissionsSpecification?: Text | URL
}

type FinancialService =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& FinancialServiceProps

export default FinancialService
