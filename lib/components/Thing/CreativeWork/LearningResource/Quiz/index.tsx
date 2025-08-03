import type BaseProps from "../../../../../types/index.ts"
import type { Quiz as QuizProps } from "../../../../../types/index.ts"

import LearningResource from "../index.tsx"

export type Props = QuizProps & BaseProps

export default function Quiz({
	_type = "Quiz",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
