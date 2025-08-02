import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

export type ActivateActionType = "ActivateAction"

export interface ActivateActionProps {
	"@type"?: ActivateActionType
}

type ActivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& ActivateActionProps

export default ActivateAction
