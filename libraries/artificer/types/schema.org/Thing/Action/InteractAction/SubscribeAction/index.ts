import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export type SubscribeActionType = "SubscribeAction"

export interface SubscribeActionProps {
	"@type"?: SubscribeActionType
}

type SubscribeAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& SubscribeActionProps

export default SubscribeAction
