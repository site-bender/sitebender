import type BaseProps from "../../../../../types/index.ts"
import type { SyllabusProps } from "../../../../../types/Thing/CreativeWork/LearningResource/Syllabus/index.ts"

import LearningResource from "../index.tsx"

export type Props = SyllabusProps & BaseProps

export default function Syllabus({
	_type = "Syllabus",
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
