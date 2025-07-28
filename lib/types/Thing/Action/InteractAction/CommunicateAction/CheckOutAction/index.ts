import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import CheckOutActionComponent from "../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/CheckOutAction/index.tsx"

export interface CheckOutActionProps {
}

type CheckOutAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CheckOutActionProps

export default CheckOutAction
