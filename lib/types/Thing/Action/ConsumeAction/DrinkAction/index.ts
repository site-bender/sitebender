import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface DrinkActionProps {
	"@type"?: "DrinkAction"}

type DrinkAction = Thing & ActionProps & ConsumeActionProps & DrinkActionProps

export default DrinkAction
