import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import StatusEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/index.tsx"

export interface StatusEnumerationProps {
}

type StatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps

export default StatusEnumeration
