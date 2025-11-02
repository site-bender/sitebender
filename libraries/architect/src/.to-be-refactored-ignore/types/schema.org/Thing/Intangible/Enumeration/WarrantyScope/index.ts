import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type WarrantyScopeType = "WarrantyScope"

export interface WarrantyScopeProps {
	"@type"?: WarrantyScopeType
}

type WarrantyScope =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& WarrantyScopeProps

export default WarrantyScope
