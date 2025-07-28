import type BaseProps from "../../../../types/index.ts"
import type { CommentProps } from "../../../../types/Thing/CreativeWork/Comment/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CommentProps & BaseProps

export default function Comment({
	downvoteCount,
	parentItem,
	sharedContent,
	upvoteCount,
	_type = "Comment",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				downvoteCount,
				parentItem,
				sharedContent,
				upvoteCount,
				...subtypeProperties,
			}}
		/>
	)
}
