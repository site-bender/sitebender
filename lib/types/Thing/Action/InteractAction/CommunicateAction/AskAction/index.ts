import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"
import type Question from "../../../../CreativeWork/Comment/Question/index.ts"

export interface AskActionProps {
	question?: Question
}

type AskAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& AskActionProps

export default AskAction
