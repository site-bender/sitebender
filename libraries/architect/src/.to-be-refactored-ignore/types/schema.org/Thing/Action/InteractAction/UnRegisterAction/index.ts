import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export type UnRegisterActionType = "UnRegisterAction"

export interface UnRegisterActionProps {
	"@type"?: UnRegisterActionType
}

type UnRegisterAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& UnRegisterActionProps

export default UnRegisterAction
