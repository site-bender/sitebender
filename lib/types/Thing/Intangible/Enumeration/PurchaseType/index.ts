import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface PurchaseTypeProps {}

type PurchaseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PurchaseTypeProps

export default PurchaseType
