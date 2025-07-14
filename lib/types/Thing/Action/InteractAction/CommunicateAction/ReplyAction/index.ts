import Comment from "../../../../CreativeWork/Comment/index.ts"
import CommunicateAction from "../index.ts"

export default interface ReplyAction extends CommunicateAction {
	/** A sub property of result. The Comment created or sent as a result of this action. */
	resultComment?: Comment
}
