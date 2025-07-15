import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CommentProps from "../../../../types/Thing/Comment/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	CommentProps,
	"Comment",
	ExtractLevelProps<CommentProps, CreativeWorkProps>
>

export default function Comment(
	{
		downvoteCount,
		parentItem,
		sharedContent,
		upvoteCount,
		schemaType = "Comment",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
