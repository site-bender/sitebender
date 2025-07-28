import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import IncentiveTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/IncentiveType/index.tsx"

export interface IncentiveTypeProps {
}

type IncentiveType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& IncentiveTypeProps

export default IncentiveType
