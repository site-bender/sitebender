import type Comment from "../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface CommentActionProps {
	/** A sub property of result. The Comment created or sent as a result of this action. */
	resultComment?: Comment
}

type CommentAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& CommentActionProps

export default CommentAction
