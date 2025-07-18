import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type UseActionProps from "../../../../../types/Thing/UseAction/index.ts"

import ConsumeAction from "../index.tsx"

// UseAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	UseActionProps,
	"UseAction",
	ExtractLevelProps<UseActionProps, ConsumeActionProps>
>

export default function UseAction({
	schemaType = "UseAction",
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
