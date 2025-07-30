import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface WatchActionProps {
	"@type"?: "WatchAction"}

type WatchAction = Thing & ActionProps & ConsumeActionProps & WatchActionProps

export default WatchAction
