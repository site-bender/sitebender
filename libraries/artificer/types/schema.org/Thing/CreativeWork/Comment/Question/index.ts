import type { Integer, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type Answer from "../Answer/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import AnswerComponent from "../../../../../../../architect/src/define/Thing/CreativeWork/Comment/Answer/index.tsx"
import CommentComponent from "../../../../../../../architect/src/define/Thing/CreativeWork/Comment/index.tsx"
import CreativeWorkComponent from "../../../../../../../architect/src/define/Thing/CreativeWork/index.tsx"
import ItemListComponent from "../../../../../../../architect/src/define/Thing/Intangible/ItemList/index.tsx"

export type QuestionType = "Question"

export interface QuestionProps {
	"@type"?: QuestionType
	acceptedAnswer?:
		| Answer
		| ItemList
		| ReturnType<typeof AnswerComponent>
		| ReturnType<typeof ItemListComponent>
	answerCount?: Integer
	eduQuestionType?: Text
	parentItem?:
		| Comment
		| CreativeWork
		| ReturnType<typeof CommentComponent>
		| ReturnType<typeof CreativeWorkComponent>
	suggestedAnswer?:
		| Answer
		| ItemList
		| ReturnType<typeof AnswerComponent>
		| ReturnType<typeof ItemListComponent>
}

type Question = Thing & CreativeWorkProps & CommentProps & QuestionProps

export default Question
