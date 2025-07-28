import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import UnRegisterActionComponent from "../../../../../../components/Thing/Action/InteractAction/UnRegisterAction/index.tsx"

export interface UnRegisterActionProps {
}

type UnRegisterAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& UnRegisterActionProps

export default UnRegisterAction
