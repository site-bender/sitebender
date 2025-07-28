import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

import LegalForceStatusComponent from "../../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.tsx"

export interface LegalForceStatusProps {
}

type LegalForceStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& LegalForceStatusProps

export default LegalForceStatus
