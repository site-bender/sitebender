import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { CommentProps } from "../../../../../types/Thing/CreativeWork/Comment/index.ts"
import type { AnswerProps } from "../../../../../types/Thing/CreativeWork/Comment/Answer/index.ts"

import Comment from "../index.tsx"

export type Props = BaseComponentProps<
	AnswerProps,
	"Answer",
	ExtractLevelProps<ThingProps, CreativeWorkProps, CommentProps>
>

export default function Answer({
	answerExplanation,
	parentItem,
	schemaType = "Answer",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Comment
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				answerExplanation,
				parentItem,
				...subtypeProperties,
			}}
		/>
	)
}
