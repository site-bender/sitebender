import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface SolveMathActionProps {
	/** For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format of question being given. Example: "Multiple choice", "Open ended", "Flashcard". */
	eduQuestionType?: Text
}

type SolveMathAction =
	& Thing
	& ActionProps
	& SolveMathActionProps

export default SolveMathAction
