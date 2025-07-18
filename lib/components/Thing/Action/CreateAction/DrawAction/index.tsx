import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"
import type DrawActionProps from "../../../../../types/Thing/DrawAction/index.ts"

import CreateAction from "../index.tsx"

// DrawAction adds no properties to the CreateAction schema type
export type Props = BaseComponentProps<
	DrawActionProps,
	"DrawAction",
	ExtractLevelProps<DrawActionProps, CreateActionProps>
>

export default function DrawAction({
	schemaType = "DrawAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
