import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type PriceTypeEnumerationType = "PriceTypeEnumeration"

export interface PriceTypeEnumerationProps {
	"@type"?: PriceTypeEnumerationType
}

type PriceTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PriceTypeEnumerationProps

export default PriceTypeEnumeration
