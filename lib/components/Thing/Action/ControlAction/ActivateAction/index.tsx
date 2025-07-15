import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ActivateActionProps from "../../../../../types/Thing/ActivateAction/index.ts"
import type ControlActionProps from "../../../../../types/Thing/ControlAction/index.ts"

import ControlAction from "./index.tsx"

// ActivateAction adds no properties to the ControlAction schema type
export type Props = BaseComponentProps<
	ActivateActionProps,
	"ActivateAction",
	ExtractLevelProps<ActivateActionProps, ControlActionProps>
>

export default function ActivateAction({
	schemaType = "ActivateAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ControlAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
