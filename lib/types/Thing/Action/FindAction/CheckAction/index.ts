// CheckAction extends FindAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CheckActionProps {}

type CheckAction =
	& Thing
	& ActionProps
	& FindActionProps
	& CheckActionProps

export default CheckAction
