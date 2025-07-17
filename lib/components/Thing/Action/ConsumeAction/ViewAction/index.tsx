import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type ViewActionProps from "../../../../../types/Thing/ViewAction/index.ts"

import ConsumeAction from "../index.tsx"

// ViewAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	ViewActionProps,
	"ViewAction",
	ExtractLevelProps<ViewActionProps, ConsumeActionProps>
>

export default function ViewAction({
	schemaType = "ViewAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ConsumeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
