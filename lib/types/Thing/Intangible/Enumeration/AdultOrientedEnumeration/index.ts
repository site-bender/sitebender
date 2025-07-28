import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import AdultOrientedEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/AdultOrientedEnumeration/index.tsx"

export interface AdultOrientedEnumerationProps {
}

type AdultOrientedEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& AdultOrientedEnumerationProps

export default AdultOrientedEnumeration
