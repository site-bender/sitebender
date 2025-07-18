import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AcceptActionProps from "../../../../../../types/Thing/AcceptAction/index.ts"
import type AllocateActionProps from "../../../../../../types/Thing/AllocateAction/index.ts"

import AllocateAction from "../index.tsx"

// AcceptAction adds no properties to the AllocateAction schema type
export type Props = BaseComponentProps<
	AcceptActionProps,
	"AcceptAction",
	ExtractLevelProps<AcceptActionProps, AllocateActionProps>
>

export default function AcceptAction({
	schemaType = "AcceptAction",
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
