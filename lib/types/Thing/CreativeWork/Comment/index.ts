import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CommentComponent from "../../../../components/Thing/CreativeWork/Comment/index.ts"
import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"

export interface CommentProps {
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
