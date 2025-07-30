import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

export interface TakeActionProps {
	"@type"?: "TakeAction"}

type TakeAction = Thing & ActionProps & TransferActionProps & TakeActionProps

export default TakeAction
