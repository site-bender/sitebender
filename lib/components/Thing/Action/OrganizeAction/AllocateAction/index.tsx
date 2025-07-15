import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AllocateActionProps from "../../../../../types/Thing/AllocateAction/index.ts"
import type OrganizeActionProps from "../../../../../types/Thing/OrganizeAction/index.ts"

import OrganizeAction from "./index.tsx"

// AllocateAction adds no properties to the OrganizeAction schema type
export type Props = BaseComponentProps<
	AllocateActionProps,
	"AllocateAction",
	ExtractLevelProps<AllocateActionProps, OrganizeActionProps>
>

export default function AllocateAction({
	schemaType = "AllocateAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<OrganizeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
