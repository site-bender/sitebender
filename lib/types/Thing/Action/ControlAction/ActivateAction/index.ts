import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

export interface ActivateActionProps {
}

type ActivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& ActivateActionProps

export default ActivateAction
