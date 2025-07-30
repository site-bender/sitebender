import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface FinancialServiceProps {
	"@type"?: "FinancialService"
	feesAndCommissionsSpecification?: Text | URL
}

type FinancialService =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& FinancialServiceProps

export default FinancialService
