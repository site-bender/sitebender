import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export type ShareActionType = "ShareAction"

export interface ShareActionProps {
	"@type"?: ShareActionType
}

type ShareAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& ShareActionProps

export default ShareAction
