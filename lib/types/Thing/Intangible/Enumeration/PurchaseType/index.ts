import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type PurchaseTypeType = "PurchaseType"

export interface PurchaseTypeProps {
	"@type"?: PurchaseTypeType
}

type PurchaseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PurchaseTypeProps

export default PurchaseType
