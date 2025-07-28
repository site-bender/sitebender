import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import ControlActionComponent from "../../../../../components/Thing/Action/ControlAction/index.tsx"

export interface ControlActionProps {
}

type ControlAction =
	& Thing
	& ActionProps
	& ControlActionProps

export default ControlAction
