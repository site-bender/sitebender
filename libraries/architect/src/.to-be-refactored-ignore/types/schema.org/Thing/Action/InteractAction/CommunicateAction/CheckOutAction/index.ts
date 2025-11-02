import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export type CheckOutActionType = "CheckOutAction"

export interface CheckOutActionProps {
	"@type"?: CheckOutActionType
}

type CheckOutAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CheckOutActionProps

export default CheckOutAction
