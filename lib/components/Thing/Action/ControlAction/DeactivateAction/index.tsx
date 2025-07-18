import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ControlActionProps from "../../../../../types/Thing/ControlAction/index.ts"
import type DeactivateActionProps from "../../../../../types/Thing/DeactivateAction/index.ts"

import ControlAction from "../index.tsx"

// DeactivateAction adds no properties to the ControlAction schema type
export type Props = BaseComponentProps<
	DeactivateActionProps,
	"DeactivateAction",
	ExtractLevelProps<DeactivateActionProps, ControlActionProps>
>

export default function DeactivateAction({
	schemaType = "DeactivateAction",
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
