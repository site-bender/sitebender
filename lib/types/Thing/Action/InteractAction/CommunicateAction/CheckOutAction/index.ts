// CheckOutAction extends CommunicateAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CheckOutActionProps {}

type CheckOutAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& CheckOutActionProps

export default CheckOutAction
