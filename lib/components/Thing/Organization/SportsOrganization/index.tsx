import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type SportsOrganizationProps from "../../../../types/Thing/SportsOrganization/index.ts"

import Organization from "./index.tsx"

export type Props = BaseComponentProps<
	SportsOrganizationProps,
	"SportsOrganization",
	ExtractLevelProps<SportsOrganizationProps, OrganizationProps>
>

export default function SportsOrganization(
	{
		sport,
		schemaType = "SportsOrganization",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				sport,
				...subtypeProperties,
			}}
		/>
	)
}
