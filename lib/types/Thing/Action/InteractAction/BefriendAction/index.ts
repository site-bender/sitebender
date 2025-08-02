import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export type BefriendActionType = "BefriendAction"

export interface BefriendActionProps {
	"@type"?: BefriendActionType
}

type BefriendAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& BefriendActionProps

export default BefriendAction
