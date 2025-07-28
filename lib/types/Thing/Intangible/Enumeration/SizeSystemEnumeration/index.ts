import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import SizeSystemEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/SizeSystemEnumeration/index.tsx"

export interface SizeSystemEnumerationProps {
}

type SizeSystemEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeSystemEnumerationProps

export default SizeSystemEnumeration
