import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnswerProps from "../../../../../types/Thing/Answer/index.ts"
import type CommentProps from "../../../../../types/Thing/Comment/index.ts"

import Comment from "./index.tsx"

export type Props = BaseComponentProps<
	AnswerProps,
	"Answer",
	ExtractLevelProps<AnswerProps, CommentProps>
>

export default function Answer(
	{
		answerExplanation,
		parentItem,
		schemaType = "Answer",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
