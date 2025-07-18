import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../../types/Thing/EducationalOrganization/index.ts"
import type PreschoolProps from "../../../../../types/Thing/Preschool/index.ts"

import EducationalOrganization from "../index.tsx"

// Preschool adds no properties to the EducationalOrganization schema type
export type Props = BaseComponentProps<
	PreschoolProps,
	"Preschool",
	ExtractLevelProps<PreschoolProps, EducationalOrganizationProps>
>

export default function Preschool({
	schemaType = "Preschool",
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
