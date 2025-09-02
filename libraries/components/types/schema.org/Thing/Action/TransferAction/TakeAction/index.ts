import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

export type TakeActionType = "TakeAction"

export interface TakeActionProps {
	"@type"?: TakeActionType
}

type TakeAction = Thing & ActionProps & TransferActionProps & TakeActionProps

export default TakeAction
