import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type ProjectProps from "../../../../types/Thing/Project/index.ts"

import Organization from "../index.tsx"

// Project adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	ProjectProps,
	"Project",
	ExtractLevelProps<ProjectProps, OrganizationProps>
>

export default function Project({
	schemaType = "Project",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
