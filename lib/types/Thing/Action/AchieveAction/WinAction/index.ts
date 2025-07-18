import type Person from "../../../Person/index.ts"
import type AchieveAction from "../index.ts"

export default interface WinAction extends AchieveAction {
	/** A sub property of participant. The loser of the action. */
	loser?: Person
}
