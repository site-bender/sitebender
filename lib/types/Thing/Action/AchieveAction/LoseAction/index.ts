import type Person from "../../../Person/index.ts"
import type AchieveAction from "../index.ts"

export default interface LoseAction extends AchieveAction {
	/** A sub property of participant. The winner of the action. */
	winner?: Person
}
