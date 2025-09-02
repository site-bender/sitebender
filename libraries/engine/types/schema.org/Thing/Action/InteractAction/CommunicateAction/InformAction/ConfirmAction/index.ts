import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

export type ConfirmActionType = "ConfirmAction"

export interface ConfirmActionProps {
	"@type"?: ConfirmActionType
}

type ConfirmAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps
	& ConfirmActionProps

export default ConfirmAction
