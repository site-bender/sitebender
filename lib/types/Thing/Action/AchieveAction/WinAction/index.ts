import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

export interface WinActionProps {
	/** A sub property of participant. The loser of the action. */
	loser?: Person
}

type WinAction =
	& Thing
	& AchieveActionProps
	& ActionProps
	& WinActionProps

export default WinAction
