import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ControlActionProps from "../../../../../types/Thing/ControlAction/index.ts"
import type SuspendActionProps from "../../../../../types/Thing/SuspendAction/index.ts"

import ControlAction from "../index.tsx"

// SuspendAction adds no properties to the ControlAction schema type
export type Props = BaseComponentProps<
	SuspendActionProps,
	"SuspendAction",
	ExtractLevelProps<SuspendActionProps, ControlActionProps>
>

export default function SuspendAction({
	schemaType = "SuspendAction",
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
