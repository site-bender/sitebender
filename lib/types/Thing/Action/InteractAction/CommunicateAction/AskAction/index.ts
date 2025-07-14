import Question from "../../../../CreativeWork/Comment/Question/index.ts"
import CommunicateAction from "../index.ts"

export default interface AskAction extends CommunicateAction {
	/** A sub property of object. A question. */
	question?: Question
}
