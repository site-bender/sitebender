import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { ActivateActionType } from "./ActivateAction/index.ts"
import type { DeactivateActionType } from "./DeactivateAction/index.ts"
import type { ResumeActionType } from "./ResumeAction/index.ts"
import type { SuspendActionType } from "./SuspendAction/index.ts"

export type ControlActionType =
	| "ControlAction"
	| DeactivateActionType
	| SuspendActionType
	| ActivateActionType
	| ResumeActionType

export interface ControlActionProps {
	"@type"?: ControlActionType
}

type ControlAction = Thing & ActionProps & ControlActionProps

export default ControlAction
