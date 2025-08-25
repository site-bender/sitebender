import type { Integer, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type Answer from "../Answer/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import { Answer as AnswerComponent } from "../../../../../../components/index.tsx"
import { Comment as CommentComponent } from "../../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"
import { ItemList as ItemListComponent } from "../../../../../../components/index.tsx"

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
