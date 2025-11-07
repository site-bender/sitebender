import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { WearableSizeGroupEnumerationType } from "./WearableSizeGroupEnumeration/index.ts"

export type SizeGroupEnumerationType =
	| "SizeGroupEnumeration"
	| WearableSizeGroupEnumerationType

export interface SizeGroupEnumerationProps {
	"@type"?: SizeGroupEnumerationType
}

type SizeGroupEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeGroupEnumerationProps

export default SizeGroupEnumeration
