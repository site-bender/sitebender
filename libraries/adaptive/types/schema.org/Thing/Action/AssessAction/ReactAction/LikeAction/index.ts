import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

export type LikeActionType = "LikeAction"

export interface LikeActionProps {
	"@type"?: LikeActionType
}

type LikeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& LikeActionProps

export default LikeAction
