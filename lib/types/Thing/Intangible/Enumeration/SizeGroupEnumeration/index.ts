import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import SizeGroupEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/SizeGroupEnumeration/index.tsx"

export interface SizeGroupEnumerationProps {
}

type SizeGroupEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeGroupEnumerationProps

export default SizeGroupEnumeration
