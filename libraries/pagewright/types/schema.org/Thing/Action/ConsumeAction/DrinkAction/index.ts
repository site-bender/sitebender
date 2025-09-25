import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type DrinkActionType = "DrinkAction"

export interface DrinkActionProps {
	"@type"?: DrinkActionType
}

type DrinkAction = Thing & ActionProps & ConsumeActionProps & DrinkActionProps

export default DrinkAction
