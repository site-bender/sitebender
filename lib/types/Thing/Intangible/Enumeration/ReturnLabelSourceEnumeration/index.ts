import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type ReturnLabelSourceEnumerationType = "ReturnLabelSourceEnumeration"

export interface ReturnLabelSourceEnumerationProps {
	"@type"?: ReturnLabelSourceEnumerationType
}

type ReturnLabelSourceEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnLabelSourceEnumerationProps

export default ReturnLabelSourceEnumeration
