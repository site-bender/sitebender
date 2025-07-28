import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import ReturnLabelSourceEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/ReturnLabelSourceEnumeration/index.tsx"

export interface ReturnLabelSourceEnumerationProps {
}

type ReturnLabelSourceEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ReturnLabelSourceEnumerationProps

export default ReturnLabelSourceEnumeration
