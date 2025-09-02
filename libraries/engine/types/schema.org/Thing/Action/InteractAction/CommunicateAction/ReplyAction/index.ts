import type Comment from "../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import { Comment as CommentComponent } from "../../../../../../../components/index.tsx"

export type ReplyActionType = "ReplyAction"

export interface ReplyActionProps {
	"@type"?: ReplyActionType
	resultComment?: Comment | ReturnType<typeof CommentComponent>
}

type ReplyAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& ReplyActionProps

export default ReplyAction
