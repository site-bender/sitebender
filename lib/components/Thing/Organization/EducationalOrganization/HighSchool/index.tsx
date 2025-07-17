import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"
import type HighSchoolProps from "../../../../../types/Thing/HighSchool/index.ts"

import EducationalOrganization from "../index.tsx"

// HighSchool adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	HighSchoolProps,
	"HighSchool",
	ExtractLevelProps<HighSchoolProps, EducationalOrganizationProps>
>

export default function HighSchool({
	schemaType = "HighSchool",
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
