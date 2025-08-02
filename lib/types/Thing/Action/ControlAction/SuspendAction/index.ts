import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

export type SuspendActionType = "SuspendAction"

export interface SuspendActionProps {
	"@type"?: SuspendActionType
}

type SuspendAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& SuspendActionProps

export default SuspendAction
