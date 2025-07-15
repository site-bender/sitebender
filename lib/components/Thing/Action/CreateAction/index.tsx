import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type CreateActionProps from "../../../../types/Thing/CreateAction/index.ts"

import Action from "./index.tsx"

// CreateAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	CreateActionProps,
	"CreateAction",
	ExtractLevelProps<CreateActionProps, ActionProps>
>

export default function CreateAction({
	schemaType = "CreateAction",
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
