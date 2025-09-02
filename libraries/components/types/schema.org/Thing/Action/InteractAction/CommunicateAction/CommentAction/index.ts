import type Comment from "../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import { Comment as CommentComponent } from "../../../../../../../components/index.tsx"

export type CommentActionType = "CommentAction"

export interface CommentActionProps {
	"@type"?: CommentActionType
	resultComment?: Comment | ReturnType<typeof CommentComponent>
}

type CommentAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CommentActionProps

export default CommentAction
