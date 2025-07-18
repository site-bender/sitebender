import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type UnRegisterActionProps from "../../../../../types/Thing/UnRegisterAction/index.ts"

import InteractAction from "../index.tsx"

// UnRegisterAction adds no properties to the InteractAction schema type
export type Props = BaseComponentProps<
	UnRegisterActionProps,
	"UnRegisterAction",
	ExtractLevelProps<UnRegisterActionProps, InteractActionProps>
>

export default function UnRegisterAction({
	schemaType = "UnRegisterAction",
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
