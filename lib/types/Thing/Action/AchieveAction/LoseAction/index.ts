import Person from "../../../Person/index.ts"
import AchieveAction from "../index.ts"

export default interface LoseAction extends AchieveAction {
	/** A sub property of participant. The winner of the action. */
	winner?: Person
}
