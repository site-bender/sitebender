import type Comment from "../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import CommentComponent from "../../../../../../components/Thing/CreativeWork/Comment/index.ts"

export interface CommentActionProps {
	"@type"?: "CommentAction"
	resultComment?: Comment | ReturnType<typeof CommentComponent>
}

type CommentAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CommentActionProps

export default CommentAction
