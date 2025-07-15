import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AllocateActionProps from "../../../../../../types/Thing/AllocateAction/index.ts"
import type RejectActionProps from "../../../../../../types/Thing/RejectAction/index.ts"

import AllocateAction from "./index.tsx"

// RejectAction adds no properties to the AllocateAction schema type
export type Props = BaseComponentProps<
	RejectActionProps,
	"RejectAction",
	ExtractLevelProps<RejectActionProps, AllocateActionProps>
>

export default function RejectAction({
	schemaType = "RejectAction",
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
