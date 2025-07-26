import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface BoardingPolicyTypeProps {
}

type BoardingPolicyType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& BoardingPolicyTypeProps

export default BoardingPolicyType
