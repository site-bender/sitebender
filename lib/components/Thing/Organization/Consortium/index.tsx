import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ConsortiumProps from "../../../../types/Thing/Consortium/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "../index.tsx"

// Consortium adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	ConsortiumProps,
	"Consortium",
	ExtractLevelProps<ConsortiumProps, OrganizationProps>
>

export default function Consortium({
	schemaType = "Consortium",
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
