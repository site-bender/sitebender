import type { Text } from "../../../DataType/index.ts"
import type Action from "../index.ts"

export default interface SolveMathAction extends Action {
	/** For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format of question being given. Example: "Multiple choice", "Open ended", "Flashcard". */
	eduQuestionType?: Text
}
