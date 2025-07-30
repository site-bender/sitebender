import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ReturnMethodEnumerationProps {
	"@type"?: "ReturnMethodEnumeration"}

type ReturnMethodEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnMethodEnumerationProps

export default ReturnMethodEnumeration
