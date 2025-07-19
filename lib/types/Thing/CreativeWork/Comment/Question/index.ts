import type { Integer, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type Answer from "../Answer/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

export interface QuestionProps {
	/** The answer(s) that has been accepted as best, typically on a Question/Answer site. Sites vary in their selection mechanisms, e.g. drawing on community opinion and/or the view of the Question author. */
	acceptedAnswer?: ItemList | Answer
	/** The number of answers this question has received. */
	answerCount?: Integer
	/** For questions that are part of learning resources (e.g. Quiz), eduQuestionType indicates the format of question being given. Example: "Multiple choice", "Open ended", "Flashcard". */
	eduQuestionType?: Text
	/** The parent of a question, answer or item in general. Typically used for Q/A discussion threads e.g. a chain of comments with the first comment being an [[Article]] or other [[CreativeWork]]. See also [[comment]] which points from something to a comment about it. */
	parentItem?: Comment | CreativeWork
	/** An answer (possibly one of several, possibly incorrect) to a Question, e.g. on a Question/Answer site. */
	suggestedAnswer?: ItemList | Answer
}

type Question =
	& Thing
	& CommentProps
	& CreativeWorkProps
	& QuestionProps

export default Question
