import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AddActionProps from "../../../../../types/Thing/AddAction/index.ts"
import type UpdateActionProps from "../../../../../types/Thing/UpdateAction/index.ts"

import UpdateAction from "../index.tsx"

// AddAction adds no properties to the UpdateAction schema type
export type Props = BaseComponentProps<
	AddActionProps,
	"AddAction",
	ExtractLevelProps<AddActionProps, UpdateActionProps>
>

export default function AddAction({
	schemaType = "AddAction",
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
