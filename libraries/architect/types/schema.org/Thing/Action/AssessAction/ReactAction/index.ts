import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"
import type { AgreeActionType } from "./AgreeAction/index.ts"
import type { DisagreeActionType } from "./DisagreeAction/index.ts"
import type { DislikeActionType } from "./DislikeAction/index.ts"
import type { EndorseActionType } from "./EndorseAction/index.ts"
import type { LikeActionType } from "./LikeAction/index.ts"
import type { WantActionType } from "./WantAction/index.ts"

export type ReactActionType =
	| "ReactAction"
	| DislikeActionType
	| WantActionType
	| EndorseActionType
	| LikeActionType
	| DisagreeActionType
	| AgreeActionType

export interface ReactActionProps {
	"@type"?: ReactActionType
}

type ReactAction = Thing & ActionProps & AssessActionProps & ReactActionProps

export default ReactAction
