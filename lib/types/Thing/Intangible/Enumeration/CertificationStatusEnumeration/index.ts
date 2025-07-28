import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import CertificationStatusEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/CertificationStatusEnumeration/index.tsx"

export interface CertificationStatusEnumerationProps {
}

type CertificationStatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& CertificationStatusEnumerationProps

export default CertificationStatusEnumeration
