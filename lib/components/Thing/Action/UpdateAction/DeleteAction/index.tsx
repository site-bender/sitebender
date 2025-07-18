import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DeleteActionProps from "../../../../../types/Thing/DeleteAction/index.ts"
import type UpdateActionProps from "../../../../../types/Thing/UpdateAction/index.ts"

import UpdateAction from "../index.tsx"

// DeleteAction adds no properties to the UpdateAction schema type
export type Props = BaseComponentProps<
	DeleteActionProps,
	"DeleteAction",
	ExtractLevelProps<DeleteActionProps, UpdateActionProps>
>

export default function DeleteAction({
	schemaType = "DeleteAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<UpdateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
