import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"
import type MiddleSchoolProps from "../../../../../types/Thing/MiddleSchool/index.ts"

import EducationalOrganization from "./index.tsx"

// MiddleSchool adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	MiddleSchoolProps,
	"MiddleSchool",
	ExtractLevelProps<MiddleSchoolProps, EducationalOrganizationProps>
>

export default function MiddleSchool({
	schemaType = "MiddleSchool",
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
