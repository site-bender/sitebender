import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"
import type ElementarySchoolProps from "../../../../../types/Thing/ElementarySchool/index.ts"

import EducationalOrganization from "../index.tsx"

// ElementarySchool adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	ElementarySchoolProps,
	"ElementarySchool",
	ExtractLevelProps<ElementarySchoolProps, EducationalOrganizationProps>
>

export default function ElementarySchool({
	schemaType = "ElementarySchool",
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
