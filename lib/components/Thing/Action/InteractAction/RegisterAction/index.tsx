import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InteractActionProps from "../../../../../types/Thing/InteractAction/index.ts"
import type RegisterActionProps from "../../../../../types/Thing/RegisterAction/index.ts"

import InteractAction from "./index.tsx"

// RegisterAction adds no properties to the InteractAction schema type
export type Props = BaseComponentProps<
	RegisterActionProps,
	"RegisterAction",
	ExtractLevelProps<RegisterActionProps, InteractActionProps>
>

export default function RegisterAction({
	schemaType = "RegisterAction",
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
