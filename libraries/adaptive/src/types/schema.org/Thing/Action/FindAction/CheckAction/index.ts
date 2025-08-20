import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

export type CheckActionType = "CheckAction"

export interface CheckActionProps {
	"@type"?: CheckActionType
}

type CheckAction = Thing & ActionProps & FindActionProps & CheckActionProps

export default CheckAction
