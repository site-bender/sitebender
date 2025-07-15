import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LearningResourceProps from "../../../../../types/Thing/LearningResource/index.ts"
import type QuizProps from "../../../../../types/Thing/Quiz/index.ts"

import LearningResource from "./index.tsx"

// Quiz adds no properties to the LearningResource schema type
export type Props = BaseComponentProps<
	QuizProps,
	"Quiz",
	ExtractLevelProps<QuizProps, LearningResourceProps>
>

export default function Quiz({
	schemaType = "Quiz",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LearningResource
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
