import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type ReadActionProps from "../../../../../types/Thing/ReadAction/index.ts"

import ConsumeAction from "../index.tsx"

// ReadAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	ReadActionProps,
	"ReadAction",
	ExtractLevelProps<ReadActionProps, ConsumeActionProps>
>

export default function ReadAction({
	schemaType = "ReadAction",
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
