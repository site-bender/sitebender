import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"
import type WorkersUnionProps from "../../../../types/Thing/WorkersUnion/index.ts"

import Organization from "../index.tsx"

// WorkersUnion adds no properties to the Organization schema type
export type Props = BaseComponentProps<
	WorkersUnionProps,
	"WorkersUnion",
	ExtractLevelProps<WorkersUnionProps, OrganizationProps>
>

export default function WorkersUnion({
	schemaType = "WorkersUnion",
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
