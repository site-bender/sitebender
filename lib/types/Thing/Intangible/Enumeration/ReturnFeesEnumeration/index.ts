import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ReturnFeesEnumerationProps {}

type ReturnFeesEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnFeesEnumerationProps

export default ReturnFeesEnumeration
