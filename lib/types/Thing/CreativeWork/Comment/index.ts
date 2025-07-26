import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWork from "../index.ts"

export interface CommentProps {
	downvoteCount?: Integer
	parentItem?: Comment | CreativeWork
	sharedContent?: CreativeWork
	upvoteCount?: Integer
}

type Comment =
	& Thing
	& CreativeWorkProps
	& CommentProps

export default Comment
