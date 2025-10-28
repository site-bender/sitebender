import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { AnswerType } from "./Answer/index.ts"
import type { CorrectionCommentType } from "./CorrectionComment/index.ts"
import type { QuestionType } from "./Question/index.ts"

import CommentComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/Comment/index.tsx"
import CreativeWorkComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/index.tsx"

export type CommentType =
	| "Comment"
	| AnswerType
	| QuestionType
	| CorrectionCommentType

export interface CommentProps {
	"@type"?: CommentType
	downvoteCount?: Integer
	parentItem?:
		| Comment
		| CreativeWork
		| ReturnType<typeof CommentComponent>
		| ReturnType<typeof CreativeWorkComponent>
	sharedContent?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	upvoteCount?: Integer
}

type Comment = Thing & CreativeWorkProps & CommentProps

export default Comment
