import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SizeGroupEnumerationProps } from "../index.ts"

export type WearableSizeGroupEnumerationType = "WearableSizeGroupEnumeration"

export interface WearableSizeGroupEnumerationProps {
	"@type"?: WearableSizeGroupEnumerationType
}

type WearableSizeGroupEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeGroupEnumerationProps
	& WearableSizeGroupEnumerationProps

export default WearableSizeGroupEnumeration
