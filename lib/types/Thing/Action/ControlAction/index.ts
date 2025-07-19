// ControlAction extends Action but adds no additional properties
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ControlActionProps {}

type ControlAction =
	& Thing
	& ActionProps
	& ControlActionProps

export default ControlAction
