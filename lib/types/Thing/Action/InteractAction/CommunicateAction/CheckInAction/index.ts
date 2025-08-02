import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export type CheckInActionType = "CheckInAction"

export interface CheckInActionProps {
	"@type"?: CheckInActionType
}

type CheckInAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CheckInActionProps

export default CheckInAction
