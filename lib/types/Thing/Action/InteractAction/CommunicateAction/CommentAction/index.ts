import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type Comment from "../../../../CreativeWork/Comment/index.ts"

import CommentActionComponent from "../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/CommentAction/index.tsx"

export interface CommentActionProps {
	resultComment?: Comment
}

type CommentAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CommentActionProps

export default CommentAction
