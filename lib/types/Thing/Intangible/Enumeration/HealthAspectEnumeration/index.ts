import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import HealthAspectEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/HealthAspectEnumeration/index.tsx"

export interface HealthAspectEnumerationProps {
}

type HealthAspectEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& HealthAspectEnumerationProps

export default HealthAspectEnumeration
