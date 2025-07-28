import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

import DeactivateActionComponent from "../../../../../../components/Thing/Action/ControlAction/DeactivateAction/index.tsx"

export interface DeactivateActionProps {
}

type DeactivateAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& DeactivateActionProps

export default DeactivateAction
