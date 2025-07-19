// RegisterAction extends InteractAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RegisterActionProps {}

type RegisterAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& RegisterActionProps

export default RegisterAction
