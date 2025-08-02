import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export type PhotographActionType = "PhotographAction"

export interface PhotographActionProps {
	"@type"?: PhotographActionType
}

type PhotographAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& PhotographActionProps

export default PhotographAction
