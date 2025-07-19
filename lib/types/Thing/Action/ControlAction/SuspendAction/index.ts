// SuspendAction extends ControlAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SuspendActionProps {}

type SuspendAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& SuspendActionProps

export default SuspendAction
