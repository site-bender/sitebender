import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import IncentiveStatusComponent from "../../../../../../components/Thing/Intangible/Enumeration/IncentiveStatus/index.tsx"

export interface IncentiveStatusProps {
}

type IncentiveStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveStatusProps

export default IncentiveStatus
