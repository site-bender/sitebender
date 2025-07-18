import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type PerformingGroupProps from "../../../../types/Thing/PerformingGroup/index.ts"

import Organization from "../index.tsx"

// PerformingGroup adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	PerformingGroupProps,
	"PerformingGroup",
	ExtractLevelProps<PerformingGroupProps, OrganizationProps>
>

export default function PerformingGroup({
	schemaType = "PerformingGroup",
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
