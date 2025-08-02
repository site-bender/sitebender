import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export type LoseActionType = "LoseAction"

export interface LoseActionProps {
	"@type"?: LoseActionType
	winner?: Person | ReturnType<typeof PersonComponent>
}

type LoseAction = Thing & ActionProps & AchieveActionProps & LoseActionProps

export default LoseAction
