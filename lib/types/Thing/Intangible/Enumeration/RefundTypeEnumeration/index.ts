import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface RefundTypeEnumerationProps {
}

type RefundTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RefundTypeEnumerationProps

export default RefundTypeEnumeration
