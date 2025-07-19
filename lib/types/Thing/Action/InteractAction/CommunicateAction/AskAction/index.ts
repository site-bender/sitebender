import type Question from "../../../../CreativeWork/Comment/Question/index.ts"
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface AskActionProps {
	/** A sub property of object. A question. */
	question?: Question
}

type AskAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& AskActionProps

export default AskAction
