import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type RefundTypeEnumerationType = "RefundTypeEnumeration"

export interface RefundTypeEnumerationProps {
	"@type"?: RefundTypeEnumerationType
}

type RefundTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RefundTypeEnumerationProps

export default RefundTypeEnumeration
