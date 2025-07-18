import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type InteractActionProps from "../../../../types/Thing/InteractAction/index.ts"

import Action from "../index.tsx"

// InteractAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	InteractActionProps,
	"InteractAction",
	ExtractLevelProps<InteractActionProps, ActionProps>
>

export default function InteractAction({
	schemaType = "InteractAction",
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
