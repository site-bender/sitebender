import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export type RegisterActionType = "RegisterAction"

export interface RegisterActionProps {
	"@type"?: RegisterActionType
}

type RegisterAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& RegisterActionProps

export default RegisterAction
