import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BefriendActionProps from "../../../../../types/Thing/BefriendAction/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"

import InteractAction from "../index.tsx"

// BefriendAction adds no properties to the InteractAction schema type
export type Props = BaseComponentProps<
	BefriendActionProps,
	"BefriendAction",
	ExtractLevelProps<BefriendActionProps, InteractActionProps>
>

export default function BefriendAction({
	schemaType = "BefriendAction",
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
