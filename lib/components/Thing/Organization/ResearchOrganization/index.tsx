import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type ResearchOrganizationProps from "../../../../types/Thing/ResearchOrganization/index.ts"

import Organization from "../index.tsx"

// ResearchOrganization adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	ResearchOrganizationProps,
	"ResearchOrganization",
	ExtractLevelProps<ResearchOrganizationProps, OrganizationProps>
>

export default function ResearchOrganization({
	schemaType = "ResearchOrganization",
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
