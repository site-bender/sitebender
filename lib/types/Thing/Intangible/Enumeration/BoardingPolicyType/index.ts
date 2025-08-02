import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type BoardingPolicyTypeType = "BoardingPolicyType"

export interface BoardingPolicyTypeProps {
	"@type"?: BoardingPolicyTypeType
}

type BoardingPolicyType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BoardingPolicyTypeProps

export default BoardingPolicyType
