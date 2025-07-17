import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type SearchRescueOrganizationProps from "../../../../types/Thing/SearchRescueOrganization/index.ts"

import Organization from "../index.tsx"

// SearchRescueOrganization adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	SearchRescueOrganizationProps,
	"SearchRescueOrganization",
	ExtractLevelProps<SearchRescueOrganizationProps, OrganizationProps>
>

export default function SearchRescueOrganization({
	schemaType = "SearchRescueOrganization",
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
