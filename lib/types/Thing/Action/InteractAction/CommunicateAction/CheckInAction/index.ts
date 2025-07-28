import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

export interface CheckInActionProps {}

type CheckInAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& CheckInActionProps

export default CheckInAction
