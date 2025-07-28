import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import RegisterActionComponent from "../../../../../../components/Thing/Action/InteractAction/RegisterAction/index.tsx"

export interface RegisterActionProps {
}

type RegisterAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& RegisterActionProps

export default RegisterAction
