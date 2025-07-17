import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type FindActionProps from "../../../../types/Thing/FindAction/index.ts"

import Action from "../index.tsx"

// FindAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	FindActionProps,
	"FindAction",
	ExtractLevelProps<FindActionProps, ActionProps>
>

export default function FindAction({
	schemaType = "FindAction",
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
