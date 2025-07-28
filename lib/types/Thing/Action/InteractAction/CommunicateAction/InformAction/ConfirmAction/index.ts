import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

import ConfirmActionComponent from "../../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/InformAction/ConfirmAction/index.tsx"

export interface ConfirmActionProps {
}

type ConfirmAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps
	& ConfirmActionProps

export default ConfirmAction
