// SubscribeAction extends InteractAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SubscribeActionProps {}

type SubscribeAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& SubscribeActionProps

export default SubscribeAction
