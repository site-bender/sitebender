import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ProjectProps from "../../../../../types/Thing/Project/index.ts"
import type ResearchProjectProps from "../../../../../types/Thing/ResearchProject/index.ts"

import Project from "../index.tsx"

// ResearchProject adds no properties to the Project schema type
export type Props = BaseComponentProps<
	ResearchProjectProps,
	"ResearchProject",
	ExtractLevelProps<ResearchProjectProps, ProjectProps>
>

export default function ResearchProject({
	schemaType = "ResearchProject",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Project
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
