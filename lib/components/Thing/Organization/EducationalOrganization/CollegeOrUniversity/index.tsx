import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CollegeOrUniversityProps from "../../../../../types/Thing/CollegeOrUniversity/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"

import EducationalOrganization from "../index.tsx"

// CollegeOrUniversity adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	CollegeOrUniversityProps,
	"CollegeOrUniversity",
	ExtractLevelProps<CollegeOrUniversityProps, EducationalOrganizationProps>
>

export default function CollegeOrUniversity({
	schemaType = "CollegeOrUniversity",
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
