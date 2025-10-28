import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type PriceComponentTypeEnumerationType = "PriceComponentTypeEnumeration"

export interface PriceComponentTypeEnumerationProps {
	"@type"?: PriceComponentTypeEnumerationType
}

type PriceComponentTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PriceComponentTypeEnumerationProps

export default PriceComponentTypeEnumeration
