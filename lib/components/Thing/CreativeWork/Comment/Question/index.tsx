import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { CommentProps } from "../../../../../types/Thing/CreativeWork/Comment/index.ts"
import type { QuestionProps } from "../../../../../types/Thing/CreativeWork/Comment/Question/index.ts"

import Comment from "../index.tsx"

export type Props = BaseComponentProps<
	QuestionProps,
	"Question",
	ExtractLevelProps<ThingProps, CreativeWorkProps, CommentProps>
>

export default function Question({
	acceptedAnswer,
	answerCount,
	eduQuestionType,
	parentItem,
	suggestedAnswer,
	schemaType = "Question",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Comment
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				acceptedAnswer,
				answerCount,
				eduQuestionType,
				parentItem,
				suggestedAnswer,
				...subtypeProperties,
			}}
		/>
	)
}
