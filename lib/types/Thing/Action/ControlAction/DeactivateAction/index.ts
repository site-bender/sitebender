// DeactivateAction extends ControlAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DeactivateActionProps {}

type DeactivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& DeactivateActionProps

export default DeactivateAction
