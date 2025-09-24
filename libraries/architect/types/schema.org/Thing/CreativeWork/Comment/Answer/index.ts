import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type WebContent from "../../WebContent/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import CommentComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/Comment/index.tsx"
import CreativeWorkComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/index.tsx"
import WebContentComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/WebContent/index.tsx"

export type AnswerType = "Answer"

export interface AnswerProps {
	"@type"?: AnswerType
	answerExplanation?:
		| Comment
		| WebContent
		| ReturnType<typeof CommentComponent>
		| ReturnType<typeof WebContentComponent>
	parentItem?:
		| Comment
		| CreativeWork
		| ReturnType<typeof CommentComponent>
		| ReturnType<typeof CreativeWorkComponent>
}

type Answer = Thing & CreativeWorkProps & CommentProps & AnswerProps

export default Answer
