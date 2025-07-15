import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type EducationalOrganizationProps from "../../../../types/Thing/EducationalOrganization/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "./index.tsx"

export type Props = BaseComponentProps<
	EducationalOrganizationProps,
	"EducationalOrganization",
	ExtractLevelProps<EducationalOrganizationProps, OrganizationProps>
>

export default function EducationalOrganization(
	{
		alumni,
		schemaType = "EducationalOrganization",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				alumni,
				...subtypeProperties,
			}}
		/>
	)
}
