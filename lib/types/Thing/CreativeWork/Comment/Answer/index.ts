import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CommentProps } from "../index.ts"
import type Comment from "../index.ts"
import type CreativeWork from "../../index.ts"
import type WebContent from "../../WebContent/index.ts"

export interface AnswerProps {
	answerExplanation?: Comment | WebContent
	parentItem?: Comment | CreativeWork
}

type Answer =
	& Thing
	& CreativeWorkProps
	& CommentProps
	& AnswerProps

export default Answer
