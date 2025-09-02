import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type WebContent from "../../WebContent/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

import { Comment as CommentComponent } from "../../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"
import { WebContent as WebContentComponent } from "../../../../../../components/index.tsx"

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
