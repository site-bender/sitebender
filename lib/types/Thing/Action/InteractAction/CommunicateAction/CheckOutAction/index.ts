import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface CheckOutActionProps {
	"@type"?: "CheckOutAction"}

type CheckOutAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CheckOutActionProps

export default CheckOutAction
