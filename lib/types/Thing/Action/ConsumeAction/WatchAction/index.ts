// WatchAction extends ConsumeAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface WatchActionProps {}

type WatchAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& WatchActionProps

export default WatchAction
