import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

export interface DeactivateActionProps {
}

type DeactivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& DeactivateActionProps

export default DeactivateAction
