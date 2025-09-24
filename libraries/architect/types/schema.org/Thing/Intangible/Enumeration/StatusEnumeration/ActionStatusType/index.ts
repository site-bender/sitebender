import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type ActionStatusTypeType = "ActionStatusType"

export interface ActionStatusTypeProps {
	"@type"?: ActionStatusTypeType
}

type ActionStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& ActionStatusTypeProps

export default ActionStatusType
