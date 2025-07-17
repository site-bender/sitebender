import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type ControlActionProps from "../../../../types/Thing/ControlAction/index.ts"

import Action from "../index.tsx"

// ControlAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	ControlActionProps,
	"ControlAction",
	ExtractLevelProps<ControlActionProps, ActionProps>
>

export default function ControlAction({
	schemaType = "ControlAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
