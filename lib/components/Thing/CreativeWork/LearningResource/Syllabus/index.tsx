import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LearningResourceProps from "../../../../../types/Thing/LearningResource/index.ts"
import type SyllabusProps from "../../../../../types/Thing/Syllabus/index.ts"

import LearningResource from "./index.tsx"

// Syllabus adds no properties to the LearningResource schema type
export type Props = BaseComponentProps<
	SyllabusProps,
	"Syllabus",
	ExtractLevelProps<SyllabusProps, LearningResourceProps>
>

export default function Syllabus({
	schemaType = "Syllabus",
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
