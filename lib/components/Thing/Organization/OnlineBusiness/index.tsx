import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OnlineBusinessProps from "../../../../types/Thing/OnlineBusiness/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "../index.tsx"

// OnlineBusiness adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	OnlineBusinessProps,
	"OnlineBusiness",
	ExtractLevelProps<OnlineBusinessProps, OrganizationProps>
>

export default function OnlineBusiness({
	schemaType = "OnlineBusiness",
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
