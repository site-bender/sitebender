import type { Integer, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type Answer from "../Answer/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import AnswerComponent from "../../../../../components/Thing/CreativeWork/Comment/Answer/index.ts"
import CommentComponent from "../../../../../components/Thing/CreativeWork/Comment/index.ts"
import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"
import ItemListComponent from "../../../../../components/Thing/Intangible/ItemList/index.ts"

export interface QuestionProps {
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
