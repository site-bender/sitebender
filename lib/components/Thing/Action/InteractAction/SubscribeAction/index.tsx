import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type SubscribeActionProps from "../../../../../types/Thing/SubscribeAction/index.ts"

import InteractAction from "../index.tsx"

// SubscribeAction adds no properties to the InteractAction schema type
export type Props = BaseComponentProps<
	SubscribeActionProps,
	"SubscribeAction",
	ExtractLevelProps<SubscribeActionProps, InteractActionProps>
>

export default function SubscribeAction({
	schemaType = "SubscribeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<InteractAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
