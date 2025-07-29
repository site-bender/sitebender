import type BaseProps from "../../../../../types/index.ts"
import type AnswerProps from "../../../../../types/Thing/CreativeWork/Comment/Answer/index.ts"

import Comment from "../index.tsx"

export type Props = AnswerProps & BaseProps

export default function Answer({
	answerExplanation,
	parentItem,
	_type = "Answer",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Comment
			{...props}
			_type={_type}
			subtypeProperties={{
				answerExplanation,
				parentItem,
				...subtypeProperties,
			}}
		/>
	)
}
