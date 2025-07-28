import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

import ActivateActionComponent from "../../../../../../components/Thing/Action/ControlAction/ActivateAction/index.tsx"

export interface ActivateActionProps {
}

type ActivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& ActivateActionProps

export default ActivateAction
