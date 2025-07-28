import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type WebContent from "../../WebContent/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import CommentComponent from "../../../../../components/Thing/CreativeWork/Comment/index.ts"
import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"
import WebContentComponent from "../../../../../components/Thing/CreativeWork/WebContent/index.ts"

export interface AnswerProps {
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
