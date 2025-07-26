import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"
import type Person from "../../../Person/index.ts"

export interface LoseActionProps {
	winner?: Person
}

type LoseAction =
	& Thing
	& ActionProps
	& AchieveActionProps
	& LoseActionProps

export default LoseAction
