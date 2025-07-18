import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type NGOProps from "../../../../types/Thing/NGO/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "../index.tsx"

// NGO adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	NGOProps,
	"NGO",
	ExtractLevelProps<NGOProps, OrganizationProps>
>

export default function NGO({
	schemaType = "NGO",
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
