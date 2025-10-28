import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { WearableSizeSystemEnumerationType } from "./WearableSizeSystemEnumeration/index.ts"

export type SizeSystemEnumerationType =
	| "SizeSystemEnumeration"
	| WearableSizeSystemEnumerationType

export interface SizeSystemEnumerationProps {
	"@type"?: SizeSystemEnumerationType
}

type SizeSystemEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeSystemEnumerationProps

export default SizeSystemEnumeration
