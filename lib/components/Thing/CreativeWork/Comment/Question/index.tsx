import type BaseProps from "../../../../../types/index.ts"
import type QuestionProps from "../../../../../types/Thing/CreativeWork/Comment/Question/index.ts"

import Comment from "../index.tsx"

export type Props = QuestionProps & BaseProps

export default function Question({
	acceptedAnswer,
	answerCount,
	eduQuestionType,
	parentItem,
	suggestedAnswer,
	_type = "Question",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Comment
			{...props}
			_type={_type}
			subtypeProperties={{
				acceptedAnswer,
				answerCount,
				eduQuestionType,
				parentItem,
				suggestedAnswer,
				...subtypeProperties,
			}}
		>{children}</Comment>
	)
}
