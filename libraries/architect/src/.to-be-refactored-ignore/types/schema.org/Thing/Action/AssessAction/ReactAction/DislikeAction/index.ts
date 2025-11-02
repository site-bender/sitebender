import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

export type DislikeActionType = "DislikeAction"

export interface DislikeActionProps {
	"@type"?: DislikeActionType
}

type DislikeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& DislikeActionProps

export default DislikeAction
