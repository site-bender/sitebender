import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CooperativeProps from "../../../../types/Thing/Cooperative/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "./index.tsx"

// Cooperative adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	CooperativeProps,
	"Cooperative",
	ExtractLevelProps<CooperativeProps, OrganizationProps>
>

export default function Cooperative({
	schemaType = "Cooperative",
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
