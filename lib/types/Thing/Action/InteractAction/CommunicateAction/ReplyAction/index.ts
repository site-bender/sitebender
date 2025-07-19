import type Comment from "../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface ReplyActionProps {
	/** A sub property of result. The Comment created or sent as a result of this action. */
	resultComment?: Comment
}

type ReplyAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& ReplyActionProps

export default ReplyAction
