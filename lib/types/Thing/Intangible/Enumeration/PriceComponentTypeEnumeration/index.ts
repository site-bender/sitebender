import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface PriceComponentTypeEnumerationProps {
}

type PriceComponentTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PriceComponentTypeEnumerationProps

export default PriceComponentTypeEnumeration
