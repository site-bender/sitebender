import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import BoardingPolicyTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/BoardingPolicyType/index.tsx"

export interface BoardingPolicyTypeProps {
}

type BoardingPolicyType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BoardingPolicyTypeProps

export default BoardingPolicyType
