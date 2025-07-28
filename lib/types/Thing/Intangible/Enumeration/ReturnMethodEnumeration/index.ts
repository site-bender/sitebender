import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import ReturnMethodEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/ReturnMethodEnumeration/index.tsx"

export interface ReturnMethodEnumerationProps {
}

type ReturnMethodEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnMethodEnumerationProps

export default ReturnMethodEnumeration
