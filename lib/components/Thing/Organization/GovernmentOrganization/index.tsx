import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type GovernmentOrganizationProps from "../../../../types/Thing/GovernmentOrganization/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "./index.tsx"

// GovernmentOrganization adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	GovernmentOrganizationProps,
	"GovernmentOrganization",
	ExtractLevelProps<GovernmentOrganizationProps, OrganizationProps>
>

export default function GovernmentOrganization({
	schemaType = "GovernmentOrganization",
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
