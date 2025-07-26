import type { Integer, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CommentProps } from "../index.ts"
import type Answer from "../Answer/index.ts"
import type Comment from "../index.ts"
import type CreativeWork from "../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"

export interface QuestionProps {
	acceptedAnswer?: Answer | ItemList
	answerCount?: Integer
	eduQuestionType?: Text
	parentItem?: Comment | CreativeWork
	suggestedAnswer?: Answer | ItemList
}

type Question =
	& Thing
	& CreativeWorkProps
	& CommentProps
	& QuestionProps

export default Question
