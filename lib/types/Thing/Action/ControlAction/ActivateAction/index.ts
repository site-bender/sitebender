// ActivateAction extends ControlAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ActivateActionProps {}

type ActivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& ActivateActionProps

export default ActivateAction
