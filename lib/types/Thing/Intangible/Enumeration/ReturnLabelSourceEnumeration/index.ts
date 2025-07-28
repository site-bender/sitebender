import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ReturnLabelSourceEnumerationProps {}

type ReturnLabelSourceEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnLabelSourceEnumerationProps

export default ReturnLabelSourceEnumeration
