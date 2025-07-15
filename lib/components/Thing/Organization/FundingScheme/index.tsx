import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type FundingSchemeProps from "../../../../types/Thing/FundingScheme/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "./index.tsx"

// FundingScheme adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	FundingSchemeProps,
	"FundingScheme",
	ExtractLevelProps<FundingSchemeProps, OrganizationProps>
>

export default function FundingScheme({
	schemaType = "FundingScheme",
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
