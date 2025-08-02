import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type WatchActionType = "WatchAction"

export interface WatchActionProps {
	"@type"?: WatchActionType
}

type WatchAction = Thing & ActionProps & ConsumeActionProps & WatchActionProps

export default WatchAction
