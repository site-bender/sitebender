import type Thing from "../../../index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type WebContent from "../../WebContent/index.ts"
import type Comment from "../index.ts"
import type { CommentProps } from "../index.ts"

export interface AnswerProps {
	/** A step-by-step or full explanation about Answer. Can outline how this Answer was achieved or contain more broad clarification or statement about it. */
	answerExplanation?: WebContent | Comment
	/** The parent of a question, answer or item in general. Typically used for Q/A discussion threads e.g. a chain of comments with the first comment being an [[Article]] or other [[CreativeWork]]. See also [[comment]] which points from something to a comment about it. */
	parentItem?: Comment | CreativeWork
}

type Answer =
	& Thing
	& CommentProps
	& CreativeWorkProps
	& AnswerProps

export default Answer
