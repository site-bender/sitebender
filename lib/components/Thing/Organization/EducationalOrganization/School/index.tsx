import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"
import type SchoolProps from "../../../../../types/Thing/School/index.ts"

import EducationalOrganization from "../index.tsx"

// School adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	SchoolProps,
	"School",
	ExtractLevelProps<SchoolProps, EducationalOrganizationProps>
>

export default function School({
	schemaType = "School",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EducationalOrganization
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
