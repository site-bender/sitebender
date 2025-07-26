import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface PriceTypeEnumerationProps {
}

type PriceTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PriceTypeEnumerationProps

export default PriceTypeEnumeration
