import type BaseProps from "../../../../../types/index.ts"
import type { Syllabus as SyllabusProps } from "../../../../../types/index.ts"

import LearningResource from "../index.tsx"

export type Props = SyllabusProps & BaseProps

export default function Syllabus({
	_type = "Syllabus",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
