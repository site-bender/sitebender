import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type PoliticalPartyProps from "../../../../types/Thing/PoliticalParty/index.ts"

import Organization from "./index.tsx"

// PoliticalParty adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	PoliticalPartyProps,
	"PoliticalParty",
	ExtractLevelProps<PoliticalPartyProps, OrganizationProps>
>

export default function PoliticalParty({
	schemaType = "PoliticalParty",
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
