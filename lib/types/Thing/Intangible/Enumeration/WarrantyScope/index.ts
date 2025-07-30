import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface WarrantyScopeProps {
	"@type"?: "WarrantyScope"}

type WarrantyScope =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& WarrantyScopeProps

export default WarrantyScope
