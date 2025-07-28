import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import RefundTypeEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/RefundTypeEnumeration/index.tsx"

export interface RefundTypeEnumerationProps {
}

type RefundTypeEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RefundTypeEnumerationProps

export default RefundTypeEnumeration
