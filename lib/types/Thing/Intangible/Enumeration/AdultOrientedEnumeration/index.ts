import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface AdultOrientedEnumerationProps {}

type AdultOrientedEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& AdultOrientedEnumerationProps

export default AdultOrientedEnumeration
