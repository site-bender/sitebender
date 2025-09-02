import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type ReturnMethodEnumerationType = "ReturnMethodEnumeration"

export interface ReturnMethodEnumerationProps {
	"@type"?: ReturnMethodEnumerationType
}

type ReturnMethodEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnMethodEnumerationProps

export default ReturnMethodEnumeration
