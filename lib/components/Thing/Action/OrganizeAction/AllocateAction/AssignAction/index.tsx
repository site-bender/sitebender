import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AllocateActionProps from "../../../../../../types/Thing/AllocateAction/index.ts"
import type AssignActionProps from "../../../../../../types/Thing/AssignAction/index.ts"

import AllocateAction from "./index.tsx"

// AssignAction adds no properties to the AllocateAction schema type
export type Props = BaseComponentProps<
	AssignActionProps,
	"AssignAction",
	ExtractLevelProps<AssignActionProps, AllocateActionProps>
>

export default function AssignAction({
	schemaType = "AssignAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AllocateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
