import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

export interface LoseActionProps {
	/** A sub property of participant. The winner of the action. */
	winner?: Person
}

type LoseAction =
	& Thing
	& AchieveActionProps
	& ActionProps
	& LoseActionProps

export default LoseAction
