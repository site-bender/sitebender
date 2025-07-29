import type BaseProps from "../../../../../types/index.ts"
import type QuizProps from "../../../../../types/Thing/CreativeWork/LearningResource/Quiz/index.ts"

import LearningResource from "../index.tsx"

export type Props = QuizProps & BaseProps

export default function Quiz({
	_type = "Quiz",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LearningResource
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
