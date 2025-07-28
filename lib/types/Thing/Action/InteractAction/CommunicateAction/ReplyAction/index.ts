import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type Comment from "../../../../CreativeWork/Comment/index.ts"

import ReplyActionComponent from "../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/ReplyAction/index.tsx"

export interface ReplyActionProps {
	resultComment?: Comment
}

type ReplyAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& ReplyActionProps

export default ReplyAction
