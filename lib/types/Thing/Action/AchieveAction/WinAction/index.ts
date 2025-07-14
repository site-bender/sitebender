import Person from "../../../Person/index.ts"
import AchieveAction from "../index.ts"

export default interface WinAction extends AchieveAction {
	/** A sub property of participant. The loser of the action. */
	loser?: Person
}
